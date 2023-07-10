const iudStereo= 'iud-Stereo'

const assets=[
    '/',
    'index.html',
    '/css/style.css',
    '/js/script.js',
]

self.addEventListener('install', (installEvent)=>{
    installEvent.waitUntil(
        caches.open(iudStereo).then(cache=>{
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', (activateEvent)=>{
    activateEvent.waitUntil(
        caches.keys().then(keyList=>{
            return Promise.all(keyList.map(key=>{
                if(key!=iudStereo){
                    console.log('Borrando caché antiguo',key)
                    return caches.delete(key) 
                }
            }))
        })
        )
        return self.clients.claim()
})

self.addEventListener('fetch',(fetchEvent)=>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res=>{
            console.log('Fetch...')
            return res || fetch(fetchEvent.request)
        })
    )
})

if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        console.log('Si es compatible con Service Worker')
        navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(res=> console.log('Registrado..', res))
        .catch(e=>console.log('No se pudo registrar el SW',e))
    })
    
}