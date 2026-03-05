import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'

const Home = () => {
  return (
    <main>
      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-left">
            <div className="eyebrow">AI assistant for your workflow</div>
            <h1 className="hero-title">Build faster with a smarter assistant</h1>
            <p className="hero-desc">Chat, generate, and manage content with an always-on assistant tailored to your stack. Secure, private, and built for developers.</p>

            <div className="hero-ctas">
              <Link to="/register"><button className="btn-primary">Get started — it's free</button></Link>
              <Link to="/login"><button className="btn-ghost">Sign in</button></Link>
            </div>
          </div>

          <div className="hero-visual">
            <div>Try it — ask anything</div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
