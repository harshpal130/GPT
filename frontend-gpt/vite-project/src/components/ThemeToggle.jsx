import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch (e) {
      return 'light'
    }
  })

  useEffect(() => {
    const t = theme === 'dark' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', t)
    try { localStorage.setItem('theme', t) } catch (e) {}
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <button aria-label="Toggle theme" onClick={toggle} className="theme-toggle">
      <span className="dot" style={{ transform: theme === 'dark' ? 'translateX(0)' : 'translateX(0)' }} />
      <span style={{ fontSize: 13 }}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle
