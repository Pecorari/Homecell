import { useRef } from 'react';
import Modal from 'react-modal';
import { Button } from '@chakra-ui/react';

import './stylesApPerfil.css';
import './notaCliente.css';

import imgHomecell from '../../../utils/logo.png';

Modal.setAppElement('#root');

const ModalApPerfil = (params) => {
  const {
    modalIsOpenApPerfil,
    setModalIsOpenApPerfil,
    aparelho,
    pago,
    setModelo,
    setValor,
    setPago,
    setSituacao,
    setDescricao,
    setAction,
    setModalIsOpenApEdit,
    setModalIsOpenConfirm,
    cliente
  } = params

  const notaRef = useRef(null);

  function formatDate(dataHora) {
    const data = new Date(dataHora);
    return data.toLocaleDateString("pt-br", { timeZone: "UTC" });
  };

  const dataNota = new Date();

  return (
    <div>
      <Modal
        isOpen={modalIsOpenApPerfil}
        onRequestClose={() => setModalIsOpenApPerfil(false)}
        overlayClassName='modal-overlay'
        className='modal-content-ApPerfil'>

        <h1>{aparelho.modelo}</h1>

        <label className='label'>Descrição:</label>
        <p className='txtApPerfil'>{aparelho.descricao}</p>

        <label className='label'>Valor:</label>
        <p className='txtApPerfil'>R$ {aparelho.valor}</p>

        <div className='box'>
            <label className='label'>Pago:</label>
            <input
                type='checkbox'
                value={pago}
                name='pago'
                className='checkInput'
                checked={aparelho.pago}
            />
        </div>
        <div className='box'>
            <label className='label'>Situação:</label>
            <p className='situacao'>{aparelho.situacao}</p>
        </div>
        <div className='createdUpdated'>
            <div>
            <label>Criado em:</label>
            <p>{formatDate(aparelho.created_at)}</p>
            </div>
            <div>
            <label>Ultima edição:</label>
            <p>{formatDate(aparelho.updated_at)}</p>
            </div>
        </div>
        <div>
            <Button onClick={() => {window.print()}}
            width={250}
            marginBottom={3}
            marginTop={5}
            colorScheme='green'
            variant={'outline'}>Imprimir</Button>
        </div>
        <div className='btnApPerfil'>
            <Button onClick={() => {
                setModalIsOpenConfirm(true);
                setAction('delAp');
                console.log(aparelho.modelo);
            }} width={100} marginLeft={0} colorScheme='red'>Apagar</Button>
            <Button onClick={() => {
                setModelo(aparelho.modelo);
                setDescricao(aparelho.descricao);
                setValor(aparelho.valor);
                setPago(aparelho.pago);
                setSituacao(aparelho.situacao);
                setModalIsOpenApEdit(true);
        }} width={100} marginLeft={50} colorScheme='blue'>Editar</Button>
        </div>
      </Modal>


      {/* Nota a ser imprimida */}

      <div ref={notaRef} className="nota-container">
        <div className='viaUm'>
          <img className='logo' src={imgHomecell} alt='HOME CELL' />
          <h1>Ordem de Serviço</h1>
          <div className="info">
            <div className='dadosEmpresa'>
              <div>
                <p><strong>Empresa: Homecell</strong> </p>
                <p><strong>Rua do algodão 1181</strong></p>
              </div>
              <div>
                <p><strong>CNPJ: 22.066.257/0001-64</strong></p>
                <p><strong>Cidade Nova</strong></p>
              </div>
              <div>
                <p><strong>Telefone: (19)3629-4813</strong></p>
                <p><strong>Santa Bárbara D'Oeste</strong></p>
              </div>
            </div>

            <div className='dadosCliente'>
              <h1>Dados do Cliente</h1>
              <div className='dadosCliente2'>
                <div>
                  <p><strong>Cliente:</strong> {cliente.nome}</p>
                  <p><strong>CPF:</strong> {cliente.cpf}</p>
                </div>
                <div>
                  <p><strong>Celular:</strong> {cliente.numeroCell}</p>
                  <p><strong>Telefone:</strong> {cliente.numeroRes}</p>
                </div>
                <div>
                  <p><strong>Endereço:</strong> {cliente.endereco}</p>
                  <p><strong>Cidade:</strong> {cliente.cidade}</p>
                </div>
              </div>
            </div>

            <div className='dadosAparelho'>
              <h1>Descrição técnica</h1>
              <div className='dadosAparelho2'>
                  <p><strong>Modelo:</strong> {aparelho.modelo}</p>
                <div className='descFlutuante'>
                  <p><strong>Descrição:</strong> {aparelho.descricao}</p>
                </div>
                  <p><strong>Preço Manutenção:</strong> R$ {aparelho.valor}</p>
                <div>
                  <p><strong>Pago:</strong> {aparelho.pago}</p>
                  <p><strong>Situação:</strong> {aparelho.situacao}</p>
                </div>
                
              </div>
            </div>
          </div>

          <div className="termo">
            <h1>TERMO DE APROVAÇÃO E AUTORIZAÇÃO DE SERVIÇO</h1>
            <p>Eu <strong>{cliente.nome}</strong> acima qualificado aprovo e autorizo a realização de manutenção do equipamento descriminado e individualizado <strong>{aparelho.modelo}</strong> de minha propriedade.</p>
            <p>Neste ato, tomo conhecimento de que a não retirada do equipamento no prazo de até 90 dias acarretará a adoção das medidas judiciais cabíveis para integral do pagamento do valor referente ao conserto, podendo o prestador de serviço valer-se do disposto nos artigos 1.170 a 1.176 do Código de Processo Civil, para tal fim.</p>
            <p>Além do valor devido pela manutenção, fico ciente do cumprimento do certificado de que responderei por perdas e danos, pela guarda do aparelho com o pagamento de aluguel e pelas demais despesas necessárias à realização de notificações e cobranças, inclusive despesas judiciais e honorários advocatícios.</p>
            <p className='lastP'><strong>Santa Bárbara D’Oeste, {dataNota.toLocaleDateString('pt-BR')}</strong></p>
          </div>

          <div className="assinatura">
              <p>Assinatura do Cliente</p>
          </div>
        </div>
        <br/>
        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        <br/>
        <br/>
        <div className='viaDois'>
          <img className='logo' src={imgHomecell} alt='HOME CELL' />
          <h1>Ordem de Serviço</h1>
          <div className="info">
            <div className='dadosEmpresa'>
              <div>
                <p><strong>Empresa: Homecell</strong> </p>
                <p><strong>Rua do algodão 1181</strong></p>
              </div>
              <div>
                <p><strong>CNPJ: 22.066.257/0001-64</strong></p>
                <p><strong>Cidade Nova</strong></p>
              </div>
              <div>
                <p><strong>Telefone: (19)3629-4813</strong></p>
                <p><strong>Santa Bárbara D'Oeste</strong></p>
              </div>
            </div>

            <div className='dadosCliente'>
              <h1>Dados do Cliente</h1>
              <div className='dadosCliente2'>
                <div>
                  <p><strong>Cliente:</strong> {cliente.nome}</p>
                  <p><strong>CPF:</strong> {cliente.cpf}</p>
                </div>
                <div>
                  <p><strong>Celular:</strong> {cliente.numeroCell}</p>
                  <p><strong>Telefone:</strong> {cliente.numeroRes}</p>
                </div>
                <div>
                  <p><strong>Endereço:</strong> {cliente.endereco}</p>
                  <p><strong>Cidade:</strong> {cliente.cidade}</p>
                </div>
              </div>
            </div>

            <div className='dadosAparelho'>
              <h1>Descrição técnica</h1>
              <div className='dadosAparelho2'>
                  <p><strong>Modelo:</strong> {aparelho.modelo}</p>
                <div className='descFlutuante'>
                  <p><strong>Descrição:</strong> {aparelho.descricao}</p>
                </div>
                  <p><strong>Preço Manutenção:</strong> R$ {aparelho.valor}</p>
                <div>
                  <p><strong>Pago:</strong> {aparelho.pago}</p>
                  <p><strong>Situação:</strong> {aparelho.situacao}</p>
                </div>
                
              </div>
            </div>
          </div>

          <div className="termo">
            <h1>TERMO DE APROVAÇÃO E AUTORIZAÇÃO DE SERVIÇO</h1>
            <p>Eu <strong>{cliente.nome}</strong> acima qualificado aprovo e autorizo a realização de manutenção do equipamento descriminado e individualizado <strong>{aparelho.modelo}</strong> de minha propriedade.</p>
            <p>Neste ato, tomo conhecimento de que a não retirada do equipamento no prazo de até 90 dias acarretará a adoção das medidas judiciais cabíveis para integral do pagamento do valor referente ao conserto, podendo o prestador de serviço valer-se do disposto nos artigos 1.170 a 1.176 do Código de Processo Civil, para tal fim.</p>
            <p>Além do valor devido pela manutenção, fico ciente do cumprimento do certificado de que responderei por perdas e danos, pela guarda do aparelho com o pagamento de aluguel e pelas demais despesas necessárias à realização de notificações e cobranças, inclusive despesas judiciais e honorários advocatícios.</p>
            <p>Em Manutenção referente a troca de frontal a garantia é de 90 dias e não cobre o mal uso como "risco, impacto, umidade, entre outros"</p>
            <p className='lastP'><strong>Santa Bárbara D’Oeste, {dataNota.toLocaleDateString('pt-BR')}</strong></p>
          </div>

          <div className="assinatura">
            <p>Assinatura do Cliente</p>
          </div>
          <div className="testadoRestirado">
            <p>Aparelho testado e retirado por: __________________________________________</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalApPerfil;
