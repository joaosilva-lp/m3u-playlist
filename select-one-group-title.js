const fs = require('fs');

fs.readFile('file.m3u', 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }

  const lines = data.split('\n');
  const items = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#EXTINF:') && line.includes(`group-title="Variedades & Musicas"`) || line.includes(`group-title="Noticias"`) || line.includes(`group-title="BBB 23"`)) {
      const nextLine = lines[i + 1];
        items.push(line + '\n' + nextLine);
      
    }
  }

  items.forEach(item => {
    console.log(item);
  });

  fs.writeFile('output.m3u', items.join('\n'), (writeErr) => {
    if (writeErr) {
      throw writeErr;
    }
    console.log('Saved items to output.m3u');
  });
});
