import https from 'https';
import fs from 'fs';

export default function downloadMusic(url:string, nameTrack:string, artistsTrack:string, artist: string, callback: () => void){
    
    https.get(url, res => {
        if(!fs.existsSync(`./music/${artist}`)){
            fs.mkdirSync(`./music/${artist}`)
        }
        const stream = fs.createWriteStream(`./music/${artist}/${nameTrack}-${artistsTrack}.mp3`)
        res.pipe(stream)
        stream.on('finish', () => {
            stream.close()
            callback()
        })
    })
    
}