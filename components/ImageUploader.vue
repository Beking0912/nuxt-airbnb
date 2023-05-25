<template>
    <div>
        <input type="file" accept=".jpeg,.jpg,image/jpeg" @change="uploadFile"/>
    </div>
    </template>
    <script>
    import { unWrap } from '~/utils/fetchUtils'
    
    export default {
        methods: {
            async uploadFile(e){
                const file = e.target.files[0]
                if(!file) return
                const now = Date.now()
                const filename = file.name.split('.').slice(0, -1).join('.') + now
                const options = {
                    timestamp: now,
                    public_id: filename,
                }
    
                 const resp = await unWrap(await fetch('/api/cloudinary/signature', {
                    method: 'POST',
                    body: JSON.stringify(options),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }))
                const signature = resp.json.signature
                const readData = (fileObj) => new Promise((resolve) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.readAsDataURL(fileObj)
                })
    
                const data = await readData(file)
                const formData = new FormData()
                formData.append('file', data)
                formData.append('timestamp', now)
                formData.append('public_id', filename)
                formData.append('api_key', this.$config.public.cloudinary.apiKey)
                formData.append('signature', signature)
    
                const resp2 = await fetch(`https://api.cloudinary.com/v1_1/${this.$config.public.cloudinary.cloudName}/upload`, {
                    method: 'POST',
                    body: formData,
                })
    
                const asset = await resp2.json()
    
                this.$emit('file-uploaded', asset.public_id)
    
            }
        }
    }
    </script>