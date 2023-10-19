import React from 'react';
import { MdAdd, MdWest } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import imgHomecell from '../../logo.png';

import './stylesPer.css';

const Perfil = () => {

    return(
        <div className='container'>
            <img className='logo' src={imgHomecell} alt='HOME CELL' />

            <div className='divs'>
                <div className='container-perfil'>
                    <div className='top'>
                        <Link to={'/'}>
                            <MdWest className='icon'/>
                        </Link>
                        <h1>Perfil</h1>
                    </div>

                    <div className='perfil'>
                        <label>Nome:</label>
                        <p>Thiago Pecorari Clemente</p>
                        <label>CPF:</label>
                        <p>490.802.898-25</p>
                        <label>Número do Celular:</label>
                        <p>(19) 97401-2628</p>
                        <label>Número Residencial:</label>
                        <p>(19) 3629-4813</p>
                        <label>Endereço:</label>
                        <p>Rua Curitiba 1317, Cidade Nova, Santa Bárbara D'Oeste - SP</p>
                    </div>


                    <Button colorScheme='red'>
                        Apagar
                    </Button>

                    <Button colorScheme='blue' width={100} marginLeft={150}>
                            Editar
                    </Button>
                </div>

                <div className="cell-details">
                    <h2>Aparelhos</h2>
                    <div className='cell-inf'>
                        <div>
                            <p>23/06/2023</p>
                            <p>Samsung S20+</p>
                        </div>
                        <div>
                            <p>Troca do Touch e Software</p>
                        </div>
                        <div>
                            <p>200,00</p>
                        </div>
                        <div>
                            <p>true</p>
                            <p>pronto</p>
                        </div>
                    </div>
                    
                    <Button onClick={() => console.log('Adicionar Aparelho')} leftIcon={<MdAdd />} colorScheme='green'>Novo aparelho</Button>
                </div>
            </div>
        </div>
    );
}

export default Perfil;



