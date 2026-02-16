export default function Home() {
  return (
    <main style={{
      fontFamily: "Arial, sans-serif",
      padding: "60px 20px",
      maxWidth: 900,
      margin: "0 auto",
      lineHeight: 1.6
    }}>
      
      <h1 style={{ fontSize: 48, marginBottom: 10 }}>
        RIZE 🚀
      </h1>

      <h2 style={{ fontWeight: "normal", color: "#666" }}>
        Building apps that make people safer.
      </h2>

      <p style={{ marginTop: 40 }}>
        RIZE is a Brazilian mobile app studio focused on real-world safety and community tools.
      </p>

      <p>
        Our first product is <b>VigiApp</b>, a neighborhood safety application that helps people
        alert others in real time about dangers, incidents and emergencies.
      </p>

      <div style={{ marginTop: 50 }}>
        <a href="/vigiapp" style={{
          background: "#000",
          color: "#fff",
          padding: "14px 22px",
          textDecoration: "none",
          borderRadius: 8
        }}>
          Discover VigiApp →
        </a>
      </div>

      <hr style={{ margin: "60px 0" }} />

      <h3>Company details</h3>
      <p>
        Country: Brazil <br/>
        Contact: vigiappofficial@gmail.com
      </p>

    </main>
  )
}
