import './stylesHome.css';
import logo from '../../utils/logo.png';
import { Button } from '@chakra-ui/react';
import { SlArrowDown , SlSocialInstagram , SlSocialFacebook, SlSocialGoogle  } from "react-icons/sl";
import { FaWrench, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import LojaSquare from '../../utils/LojaSquare.jpeg';
import CapaSquare from '../../utils/CapasSquare.jpeg';
import AssistenciaTecnica from '../../utils/AssistenciaTecnica.jpg';

const Home = () =>  {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='container'>
        <div className='login'>
          <Button colorScheme='whiteAlpha' variant='outline' onClick={() => navigate('/login')}>Login</Button>
        </div>

        <img src={logo} className='logo' alt='Logo'/>
        
        <div className='socialNetwork'>
          <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/homecellofficial/'>
            <SlSocialInstagram className='inst'/>
          </a>
          <a target="_blank" rel="noopener noreferrer" href='https://www.facebook.com/homecell.cell'>
            <SlSocialFacebook className='face'/>
          </a>
          <a target="_blank" rel="noopener noreferrer" href='https://g.co/kgs/DDYcRgz'>
            <SlSocialGoogle className='emai'/>
          </a>

        </div>

        <a href='#section-1'><SlArrowDown className='nextSection'/></a>
      </div>

      <div id="section-1" className='container1'>
        <h2>Bem-vindo à Homecell</h2>
        <p>Oferecemos assistência técnica especializada para seu celular. Qualidade, rapidez e preço justo!</p>

        <div className='sobre'>
          <div className='sobreTxt'>
            <h3>Sobre Nós</h3>
            <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</p>
          </div>
          <img className='sobreImg' src={LojaSquare} />
        </div>
        <div className='sobre'>
          <img className='sobreImg' src={AssistenciaTecnica} />
          <div className='sobreTxt'>
            <h3>Assistencia Técnica</h3>
            <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</p>
          </div>
        </div>
        <div className='sobre'>
          <div className='sobreTxt'>
            <h3>Acessórios</h3>
            <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</p>
          </div>
          <img className='sobreImg' src={CapaSquare} />
        </div>


        <div className="services">
          <div className="service-item">
            <FaWrench className="service-icon"/>
            <h3>Reparos Técnicos</h3>
            <p>Assistência técnica para o seu aparelho celular.</p>
          </div>

          <div className="service-item">
            <FaMobileAlt className="service-icon"/>
            <h3>Troca de Tela</h3>
            <p>Substituímos telas quebradas com peças de alta qualidade.</p>
          </div>

          <div className="service-item">
            <FaShieldAlt className="service-icon"/>
            <h3>Garantia</h3>
            <p>Garantimos a qualidade dos nossos serviços.</p>
          </div>
        </div>

        <a target="_blank"
        rel="noopener noreferrer" 
        href='https://api.whatsapp.com/send/?phone=551936294813&text=Ol%C3%A1+%21+Gostaria+de+fazer+um+orçamento+%21&type=phone_number&app_absent=0'>
          <Button colorScheme="green" size="lg" mt="20px" marginBottom={100}>
            Solicitar Orçamento
          </Button>
        </a>
      </div>
    </>
  );
}

export default Home
