import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion'
import './Home.Styles.css';
import logo from '../../utils/logo.png';
import { Button } from '@chakra-ui/react';
import { SlArrowDown , SlSocialInstagram , SlSocialFacebook, SlSocialGoogle  } from "react-icons/sl";
import { FaWrench, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import LojaSquare from '../../utils/LojaSquare.jpeg';
import CapaSquare from '../../utils/CapasSquare.jpeg';
import AssistenciaTecnica from '../../utils/AssistenciaTecnica.jpg';

const Home = () =>  {// eslint-disable-next-line
  const navigate = useNavigate();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const myObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          entry.target.classList.add('sobre-show');
        } else {
          entry.target.classList.remove('sobre-show');
        }
      });
    });

    sectionsRef.current.forEach((section) => {
      if(section) myObserver.observe(section);
    });
    
    return () => {
// eslint-disable-next-line
      sectionsRef.current.forEach((section) => {
        if(section) myObserver.unobserve(section);
      });
    };
  }, []);
  
  return (
    <>
      <div className='containerHome'>
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

        <motion.div className='motion'
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <a href='#section-1'><SlArrowDown className='nextSection'/></a>
        </motion.div>
      </div>

      <div id="section-1" className='container1'>
        <h2>Bem-vindo à Homecell</h2>
        <p>Oferecemos assistência técnica especializada para seu celular. Qualidade, rapidez e preço justo!</p>

        <div className='sobre' ref={(el) => sectionsRef.current[0] = el}>
          <div className='content'>
            <div className='sobreTxt'>
              <h3>Sobre Nós</h3>
              <p>A Homecell nasceu com a missão de oferecer soluções rápidas e eficientes para o conserto de dispositivos eletrônicos. Trabalhamos com transparência e compromisso, garantindo que cada cliente receba um atendimento de qualidade e seu aparelho em perfeito funcionamento. Com profissionalismo e um processo ágil, buscamos sempre a melhor experiência para você.</p>
            </div>
            <img alt='FotoLoja' className='sobreImg' src={LojaSquare} />
          </div>
        </div>
        <div className='sobre' ref={(el) => sectionsRef.current[1] = el}>
          <div id='assistencia' className='content'>
            <img alt='fotoAssistencia' className='sobreImg' src={AssistenciaTecnica} />
            <div className='sobreTxt'>
              <h3>Assistencia Técnica</h3>
              <p>cuidamos do seu aparelho com profissionalismo e agilidade. Nosso profissional realiza reparos em smartphones, tablets e outros dispositivos, utilizando peças de qualidade e garantindo um serviço confiável. Traga seu dispositivo para um diagnóstico e tenha a certeza de um conserto seguro e eficiente!</p>
            </div>
          </div>
        </div>
        <div className='sobre' ref={(el) => sectionsRef.current[2] = el}>
          <div className='content'>
            <div className='sobreTxt'>
              <h3>Acessórios</h3>
              <p>Aqui você encontra uma linha completa de acessórios para seu dispositivo! Oferecemos capinhas, películas, carregadores, fones de ouvido e muito mais, tudo com qualidade garantida. Proteja e personalize seu aparelho com os melhores produtos do mercado.</p>
            </div>
            <img alt='fotoAcessorios' className='sobreImg' src={CapaSquare} />
          </div>
        </div>

        <div className='contato'>
          <p>Endereço: Rua do Algodão 1181, Cidade Nova <br/> Cidade: Santa Bárbara D'Oeste | 13.454-175 </p>
          <p>Telefone: (19) 3629-4813 <br/> Email: contato@homecellofficial.com.br</p>
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

        <footer className="footer-home">Desenvolvido por <a target='_blank' rel="noopener noreferrer" href='https://github.com/Pecorari'>Thiago Pecorari Clemente</a></footer>
      </div>
    </>
  );
}

export default Home
