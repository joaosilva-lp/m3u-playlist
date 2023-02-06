const fs = require('fs');

fs.readFile('file.m3u', 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }

  const lines = data.split('\n');
  const groupTitles = new Set();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#EXTINF:')) {
      const titleMatch = line.match(/group-title="(.*?)"/);
      if (titleMatch) {
        groupTitles.add(titleMatch[1]);
      }
    }
  }

  console.log(Array.from(groupTitles));
});
