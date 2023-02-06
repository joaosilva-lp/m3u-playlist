const fs = require('fs');

fs.readFile('group-titles.txt', 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }

  const groupTitles = data.split('\n').map(title => `group-title="${title}"`);

  fs.readdir('./', (err, files) => {
    if (err) {
      throw err;
    }

    const m3uFiles = files.filter(file => file.endsWith('.m3u'));

    m3uFiles.forEach(file => {
      fs.readFile(`./${file}`, 'utf-8', (err, data) => {
        if (err) {
          throw err;
        }

        const lines = data.split('\n');
        const items = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('#EXTINF:') && groupTitles.some(title => line.includes(title))) {
            const nextLine = lines[i + 1];
            items.push(line + '\n' + nextLine);
          }
        }

        if (items.length === 0) {
          console.log(`No group-title found in ${file}`);
          return;
        }

        fs.writeFile(`output-${file}`, items.join('\n'), (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }
          console.log(`Saved items to output-${file}`);
        });
      });
    });
  });
});
