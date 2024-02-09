import https from 'https';
import fs from 'fs';

export default function downloadMusic(url:string, nameTrack:string, artistsTrack:string){
    
    https.get(url, res => {
        const stream = fs.createWriteStream(`./music/${nameTrack}-${artistsTrack}.mp3`)
        res.pipe(stream)
        stream.on('finish', () => {
            stream.close()
        })
    })
    
}