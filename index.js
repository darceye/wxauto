const { Wechaty } = require('wechaty') // import { Wechaty } from 'wechaty'
const { FileBox } = require('file-box') 

const bot = new Wechaty()
const mType = bot.Message.Type

Wechaty.instance() // Global Instance
.on('scan', (qrcode, status) => {
	console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
	require('qrcode').toString(qrcode, {type:'terminal'}, (err,str) =>{
		console.log(str)
	} )
})
.on('login',            user => console.log(`User ${user} logined`))
.on('message',       message => {
	console.log(`Message: ${message}`)
	if(message.type() === mType.Attachment){
		onMessage(message)
	}
})
.start()

async function onMessage(message){
	console.log('it is an attachment')
	const att = await message.toFileBox()
	const name = att.name
	await att.toFile('attachments\\'+name, att)
}