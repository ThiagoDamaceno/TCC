function obterStringComHoraAtual () {
  const dataAtual = new Date()
  const dia = String(dataAtual.getDate()).padStart(2, '0')
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
  const ano = dataAtual.getFullYear()

  const hora = String(dataAtual.getHours()).padStart(2, '0')
  const minutos = String(dataAtual.getMinutes()).padStart(2, '0')
  const segundos = String(dataAtual.getSeconds()).padStart(2, '0')

  return `${ano}-${mes}-${dia}_${hora}-${minutos}-${segundos}`
}

export { obterStringComHoraAtual }
