# Meetapp

    App agregador de eventos para desenvolvedores chamado Meetapp (um acrônimo à Meetup + App). Com api feita em Node + Express, interface web feita em ReactJS e interface mobile feita em React Native.

# API

    Para faze-la funcionar siga as instruções abaixo:

    - Tenha o docker instalado na sua máquina, caso não segue um guia rápido para o mesmo (https://docs.docker.com/install/linux/docker-ce/ubuntu/);
    - Crie dois containers do docker, um com a imagem do Postgres (crie um banco de dados para a aplicação nesse container) e outro com a do Redis. Não esqueça de configurar as portas na aplicação (item a seguir);
    - Crie um arquivo .env na raiz do seu projeto e configure ele seguindo o exemplo abaixo.

        APP_URL=http://localhost:3333 // URL E PORTA AONDE SUA API IRAM ESTAR RODANDO
        NODE_ENV=development // CONFIGURAÇÃO PARA DEFINIR SE A APLICAÇÃO ESTÁ EM DESENVOLVIMENTO OU PRODUÇÃO

        # Auth

        APP_SECRET=1111111111111111111111111 // CHAVE CRIPTOGRAFADA, BASE PARA CRIAÇÃO DE TOKENS NA API

        # Database

        DB_HOST= // HOST AONDE SEU CONTAINER POSTGRES ESTÁ RODANDO
        DB_USER= // USUÁRIO
        DB_PASS= // SENHA
        DB_NAME= // NOME DO BANCO

        # Redis

        REDIS_HOST= // HOST AONDE SEU CONTAINER REDIS ESTÁ RODANDO
        REDIS_PORT= // PORTA AONDE SEU CONTAINER REDIS ESTÁ RODANDO

        # Mail

        MAIL_HOST= // HOST DA SUA CAIXA DE E-MAIL
        MAIL_PORT= // PORTA AONDE ELE RODA
        MAIL_USER= // SEU USUÁRIO
        MAIL_PASS= // SUA SENHA

    - Execute yarn na raiz do seu projeto;
    - Execute yarn dev para rodar a api;


# WEB

    Para faze-la funcionar siga as instruções abaixo:

    - Execute yarn na raiz do seu projeto;
    - Execute yarn start para rodar a aplicação;


#Mobile

    A aplicação mobile foi feita e testada apenas para android, então faça o mesmo caso queira usá-la. Para faze-la funcionar siga as instruções abaixo:

    - Tenha o SDK do android e java instalados na sua máquina, caso não tenha siga esse pequeno tutorial (https://docs.rocketseat.dev/ambiente-react-native/introducao);
    - Execute yarn na raiz do seu projeto; 
    - Abra o emulador android que instalou ou conecte um dispositivo android na sua máquina;
    - Execute react-native run android
    - Após todo o processo, se o seu bundle não carregou, execute react-native start



