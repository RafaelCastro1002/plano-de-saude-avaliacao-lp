export const dataAnteriorHoje = (date: Date) => {
    const hoje = new Date()

    hoje.setHours(0,0,0,0)

    return date < hoje


}

export const dataPosterior = (date: Date) => {
    const instanteAtual = new Date().getTime()


    return date.getTime() >= instanteAtual

    
}