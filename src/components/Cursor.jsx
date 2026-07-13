import { useEffect, useRef } from 'react'

// Each trail dot config
const TRAIL_LENGTH = 18
const COLORS = [
  '#38E8FF',
  '#00C2FF', 
  '#269abd', 
  '#3c7a8d',
  '#2a3e44',
  '#90b0b9',
  '#0f2c35',
  '#152327',
  '#060808',

]

export default function Cursor() {
  const dotsRef    = useRef([])
  const mouseRef   = useRef({ x: -200, y: -200 })
  const trailRef   = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  )
  const rafRef     = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Hide native cursor on the whole page
    document.body.style.cursor = 'none'

    // ── Build trail dot elements ──────────────────────────────────────────────
    const container = document.createElement('div')
    container.setAttribute('aria-hidden', 'true')
    container.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 99999;
      overflow: hidden;
    `
    document.body.appendChild(container)
    containerRef.current = container

    const dots = Array.from({ length: TRAIL_LENGTH }, (_, i) => {
      const el = document.createElement('div')
      // Dots get smaller and more transparent toward the tail
      const progress = i / TRAIL_LENGTH          // 0 = head, 1 = tail
      const size     = Math.max(2, 11 - i * 0.45)
      const opacity  = Math.max(0.04, 1 - progress * 0.92)
      const color    = COLORS[Math.floor((i / TRAIL_LENGTH) * COLORS.length)]

      el.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        opacity: ${opacity};
        transform: translate(-50%, -50%);
        pointer-events: none;
        will-change: transform, opacity;
        transition: opacity 0.1s ease;
        box-shadow: 0 0 ${size * 2}px ${color};
      `
      container.appendChild(el)
      return el
    })
    dotsRef.current = dots

    // ── Track mouse ──────────────────────────────────────────────────────────
    const onMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Show/hide cursor when leaving/entering window
    const onLeave = () => {
      mouseRef.current.x = -400
      mouseRef.current.y = -400
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    // ── Hover effect — dots bloom on interactive elements ────────────────────
    let isHovering = false

    const onEnter = () => { isHovering = true }
    const onExit  = () => { isHovering = false }

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onExit)
      })
    }
    const hoverTimer = setTimeout(attachHover, 600)

    // ── Animation loop ───────────────────────────────────────────────────────
    const trail = trailRef.current

    const animate = () => {
      // Head of trail chases mouse with slight lag
      trail[0].x += (mouseRef.current.x - trail[0].x) * 0.38
      trail[0].y += (mouseRef.current.y - trail[0].y) * 0.38

      // Each subsequent dot chases the one ahead of it
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.55
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.55
      }

      // Apply positions + hover bloom effect
      dots.forEach((dot, i) => {
        dot.style.transform = `translate(${trail[i].x}px, ${trail[i].y}px) translate(-50%, -50%)`

        if (isHovering) {
          // Bloom: dots spread outward + brighten
          const angle   = (i / TRAIL_LENGTH) * Math.PI * 2
          const spread  = (1 - i / TRAIL_LENGTH) * 12
          const bx      = trail[i].x + Math.cos(angle) * spread
          const by      = trail[i].y + Math.sin(angle) * spread
          dot.style.transform = `translate(${bx}px, ${by}px) translate(-50%, -50%) scale(${1 + (1 - i / TRAIL_LENGTH) * 0.8})`
          dot.style.opacity   = `${Math.max(0.06, (1 - (i / TRAIL_LENGTH) * 0.7)) * 1.4}`
        } else {
          const baseOpacity = Math.max(0.04, 1 - (i / TRAIL_LENGTH) * 0.92)
          dot.style.opacity = `${baseOpacity}`
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      clearTimeout(hoverTimer)
      cancelAnimationFrame(rafRef.current)
      if (container.parentNode) container.parentNode.removeChild(container)
    }
  }, [])

  // Nothing rendered via React — all DOM is manual for maximum performance
  return null
}