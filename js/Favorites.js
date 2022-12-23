class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')
        this.load()
    }

    load(){
        this.entries = [
            {
                login: 'AlizonCaetano',
                name: 'Alison Caetano',
                public_repos: '16',
                followers: '1'
            },
             {
                login: 'maykbrito',
                name: 'Mayk Brito',
                public_repos: '76',
                followers: '120000'
            }
        ]
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => user.login !== entry.login)

        console.log(filteredEntries)
    }
}

class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.update()
    }

    update(){
        this.removeTr()

        this.entries.forEach((user)=>{
            const row = this.createRow()
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
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

export default FavoritesView