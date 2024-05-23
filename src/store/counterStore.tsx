import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import CryptoJS from 'crypto-js';


interface CounterState {
    count: number
    actualizar: (value: number) => void
    esinicio: () => void
    noemp: number
    alinicio: boolean
    nombredinamico: string
    actnombredin: (value: string) => void
    actnoemp: (value: number) => void
}

 const encrypt = (data: any) => CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key').toString();
 const decrypt = (data: any) => JSON.parse(CryptoJS.AES.decrypt(data, 'secret key').toString(CryptoJS.enc.Utf8));


export const useCounterStore = create<CounterState>()(
    persist(
        (set) => ({
            count: new Date().getFullYear(),
            actualizar: (value: number) => set(state => ({
                count: value,
                alinicio: false
            })),
            esinicio: () => set({alinicio: true}),
            noemp: 0,
            alinicio: false,
            nombredinamico: "",
            actnombredin: (value: string) => set({nombredinamico: value}),
            actnoemp: (value: number) => set({noemp: value})
        }), {
        name: "mrr-storage",
        storage: ({
            getItem: (name) => decrypt(localStorage.getItem(name)),
            setItem: (name, value) => localStorage.setItem(name, encrypt(value)),
            removeItem: (name) => localStorage.removeItem(name),
          }),
    })
)

