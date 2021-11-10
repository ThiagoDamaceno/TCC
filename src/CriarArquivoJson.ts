import axios from 'axios'
const fs = require('fs')

class CriarArquivoJson {
  async criarPelaUrl (url: string, src: string, nome: string): Promise<void> {
    const dados = await axios.get(url)

    fs.writeFile(src + '/' + nome, JSON.stringify(dados.data), function (err: any) {
      console.log(err)
    })
  }
}

export { CriarArquivoJson }
