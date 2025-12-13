export default function Projects(){
  return (
    <div className="container">
      <h2>Projects</h2>
      <div className="grid projects">
        <article className="card project">
          <img src="/assets/project1_gallery.png" alt="Photo Gallery" />
          <h3>Project 1 — Photo Gallery Website</h3>
          <p className="small">An interactive photo gallery showcasing scenic images. Built with semantic HTML, modern CSS, and JavaScript for favorites selection and UX polish.</p>
          <p><a className="btn" href="https://studentweb.cencol.ca/ylu124/comp125/assignment2.html" target="_blank" rel="noopener">View Live Gallery</a></p>
        </article>

        <article className="card project">
          <img src="/assets/project2.png" alt="Web Form with Validation" />
          <h3>Project 2 — Webpage with Forms & Validation</h3>
          <p className="small">HTML/CSS/JS form with client-side validations and clean layout. Includes text inputs, radio buttons, and textarea. Live at the link below.</p>
          <p><a className="btn" href="https://studentweb.cencol.ca/ylu124/assignment-3/assignment3.html" target="_blank" rel="noopener">View Live Page</a></p>
        </article>

        <article className="card project">
          <img src="/assets/project3.png" alt="Pong game" />
          <h3>Project 3 — Python Pong (Player vs Robot)</h3>
          <p className="small">A simple Pong-style game using Python's <code>turtle</code> module. The left paddle (blue) is controlled by the player; the right paddle (red) is an AI that tracks the ball. Use Arrow Up/Down to play. Source code included.</p>
          <p><a className="btn" href="/assets/project3_code.py" download>Download Project 3 Code</a></p>
        </article>

        <article className="card project">
          <img src="/assets/project4.png" alt="AI Agent Simulation" />
          <h3>Project 4 — AI Agent Simulation (Blind Dog)</h3>
          <p className="small">A simple reflex agent navigating a park environment. The agent perceives Food, Water, and Person; actions include eat, drink, bark, or move down. Extended to add people and run a fixed number of steps.</p>
          <p><a className="btn" href="/assets/project4_code.py" download>Download Project 4 Code</a></p>
        </article>

        <article className="card project">
          <img src="/assets/project5.png" alt="Bug Smasher game" />
          <h3>Project 5 — Bug Smasher (JavaScript)</h3>
          <p className="small">A casual browser game where you click moving bugs to score before time runs out. Adjustable speed, timer, and score display; built with vanilla JavaScript and DOM APIs.</p>
          <p><a className="btn" href="https://studentweb.cencol.ca/ylu124/comp125/assignment-6/index.html" target="_blank" rel="noopener">Play Bug Smasher</a></p>
        </article>
      </div>
    </div>
  )
}