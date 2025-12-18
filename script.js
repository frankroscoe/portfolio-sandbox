async function checkBuildFlag() {
  try {
    const res = await fetch('build.json');
    const data = await res.json();
    const buildTime = new Date(data.buildTime);
    const now = new Date();

    if (!isNaN(buildTime)) {
      const diff = now.getTime() - buildTime.getTime();

      // Debugging logs
      console.log("Build time:", buildTime.toISOString());
      console.log("Now:", now.toISOString());
      console.log("Diff (ms):", diff);
      console.log("Diff (hours):", diff / (1000 * 60 * 60));

      // Show button only if buildTime is within the past 24h
      if (diff >= 0 && diff < 24 * 60 * 60 * 1000) {
        document.getElementById('verifyBtn').style.display = 'block';
        console.log("Button shown: build is within 24h.");
      } else {
        document.getElementById('verifyBtn').style.display = 'none';
        console.log("Button hidden: build is outside 24h window.");
      }
    } else {
      console.error("Invalid buildTime in build.json");
      document.getElementById('verifyBtn').style.display = 'none';
    }
  } catch (err) {
    console.error("No build.json found", err);
    document.getElementById('verifyBtn').style.display = 'none';
  }
}

document.getElementById('verifyBtn').addEventListener('click', () => {
  const user = prompt("Enter username:");
  const pass = prompt("Enter password:");
  const checklist = prompt("Checklist notes:");

  // Log verification event
  console.log(`${new Date().toISOString()} | ${user} | ${checklist}`);

  alert("Verification logged!");
  document.getElementById('verifyBtn').style.display = 'none';
});

checkBuildFlag();
