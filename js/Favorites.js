import { GithubSearch } from "./GithubSearch.js"

export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem('@github-favorites')) || []
    }

    save(){
        localStorage.setItem('@github-favorites', JSON.stringify(this.entries))
    }

    async add(user){
        try{

            const userExists = this.entries.find( entry => entry.login.toLowerCase() === user.toLowerCase())

            if(userExists){
                throw new Error('Usuário já existente')
            }

            const gitUser = await GithubSearch.search(user)

            if(gitUser.name === null || gitUser.name === undefined){
                throw new Error('Usuário não encontrado')
            }

            this.entries = [gitUser, ...this.entries]
            this.update()
            this.save()

        }catch(error){
            alert(error.message)
        }
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => user.login !== entry.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.tbody = this.root.querySelector('table tbody')
        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.search button')

        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }
    }

    update(){
        this.removeTr()

        this.entries.forEach((user)=>{
            const row = this.createRow()
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = `${user.name}`
            row.querySelector('.user span').textContent = `${user.login}`
            row.querySelector('.repositories').textContent = `${user.public_repos}`
            row.querySelector('.followers').textContent = `${user.followers}`
            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOk){
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })
    }

    createRow(){

        const tr = document.createElement('tr')

        tr.innerHTML = ` 
            <td class="user">
                <img src="http://github.com/AlizonCaetano.png" alt="Imagem de Alison Caetano">
                <a href="http://github.com/AlizonCaetano" target="_blank">
                    <p>Alison Caetano</p>
                    <span>alizoncaetano</span>
                </a>
            </td>
            <td class="repositories">16</td>
            <td class="followers">1</td>
            <td><button class="remove">&times;</button></td>
        `

        return tr
    }

    removeTr(){
        this.tbody.querySelectorAll('tr')
        .forEach((tr)=> {tr.remove()})
    }
}
