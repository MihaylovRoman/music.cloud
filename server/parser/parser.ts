import puppeteer from 'puppeteer'
import fs from 'fs'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

type TArtist = {
    nick: string,
    image: string
}

(async () => {

    const pageHome = 'https://ru.patefon.cc/'

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://ru.patefon.cc/perfs/%D1%80%D1%8D%D0%BF_%D0%B8_%D1%85%D0%B8%D0%BF-%D1%85%D0%BE%D0%BF')



    let pagesQuantity:number = await page.evaluate(() => {
        let numberPage: string = (document.querySelector('.pagination__item:last-child') as HTMLElement).innerText
        return Number(numberPage)
    })


    for (let i = 2; i < pagesQuantity; i++) {


        let links:string[] = await page.evaluate(() => {
            let linksNick = Array.from(document.querySelectorAll('a.music-link') as NodeListOf<HTMLLinkElement>, el => el.href)
            return linksNick
        })

        for (let z = 0; z < links.length; z++) {

            await page.goto(links[z], { waitUntil: 'load' })

            let artistParams: TArtist = await page.evaluate(() => {
                let nick: string = (document.querySelector('.p-artist-head__title') as HTMLElement).innerText
                let image: string = (document.querySelector('.p-artist-head__img') as HTMLImageElement).src
                return {
                    nick,
                    image
                }
            })


            // После получения имени и изобр. записываем в БД (prisma)
            


            let pagesQuantityMusic:number = await page.evaluate(() => {
                let numberPage: string = (document.querySelector('.pagination__item:last-child') as HTMLElement).innerText
                return Number(numberPage)
            })
            // Переход к музыке Артиста

            for (let j = 0; j < pagesQuantityMusic; j++) {
                let getAllMusic = await page.evaluate(() => {
                    let trackName: string[] = Array.from(document.querySelectorAll('.tracks-card__title') as NodeListOf<HTMLElement>, el => el.innerText)
                    let trackArtists: string[] = Array.from(document.querySelectorAll('.tracks-card__desc') as NodeListOf<HTMLElement>, el => el.innerText)
                    let trackImage: string[] = Array.from(document.querySelectorAll('.tracks-card__img') as NodeListOf<HTMLImageElement>, el => el.src)
                    let playtime: string[] = Array.from(document.querySelectorAll('.tracks-card__time-full') as NodeListOf<HTMLElement>, el => el.innerText)
                    return {
                        trackName,
                        trackArtists,
                        playtime,
                        trackImage
                        // Продумать как соединить с 2 авторами
                    }
                })

                // Запись в БД
                //
                const { trackName, trackArtists, trackImage, playtime } = getAllMusic
                for (let k = 0; k < getAllMusic.playtime.length; k++) {
                    // Проверить есть ли такая песня в БД
                    // Если да, то добавить автора в []

                    let data = {
                        name: trackName[k],
                        artists: trackArtists[k],
                        playtime: playtime[k],
                        image: trackImage[k]
                    }
                    

                }


                await page.goto(`${links[z]}?page=${j + 2}`, { waitUntil: 'load' })
            }

        }
        links = []


        await page.goto(`https://ru.patefon.cc/perfs/%D1%80%D1%8D%D0%BF_%D0%B8_%D1%85%D0%B8%D0%BF-%D1%85%D0%BE%D0%BF?page=${i}`, { waitUntil: 'load' })

    }

    await browser.close()
})()