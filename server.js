const express = require('express')
const { exec } = require('child_process')
const app = express()
app.use(express.static(__dirname))

app.get('/signal', (req, res) => {
  exec("/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I", (error, stdout) => {
    if (error) return res.json({error})
    let lines = stdout.trim().split('\n')
    let rssi = null
    for (let l of lines) {
      if (l.includes('agrCtlRSSI')) {
        rssi = parseInt(l.split(':')[1].trim())
        break
      }
    }
    console.log(lines, rssi);
    res.json({rssi})
  })
})

app.listen(3000, ()=>console.log('Server listening on port 3000'))

