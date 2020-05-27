# GoMarketPlace
GoMarketPlace é um aplicativo que simula o catálogo e a página de compras (carrinho de compras) de um comércio. 

# Propósito desse projeto
Esse projeto tem o objetivo de consolidar o conhecimento adiquirido durante o bootcamp GoStack da RocketSeat.

# Como testar essa aplicação
Primeiro temos que clonar esse repositório. 
<pre> git clone https://github.com/MiguelBragaGarcia/GoMarketPlace.git</pre>

Depois de clonado precisamso instalar as dependências do projeto.
<pre> yarn install</pre>

Também precisamos de um emulador nesse projeto eu uso o emulador do próprio android studio

Depois das instalações das depêndias agora podemos rodar nosso projeto.

**Abra 1 terminal para cada comando**

Vamos executar nosso servidor fake

<pre>yarn json-server server.json -p 3333 </pre>

Se der algum erro em relação a porta mude-a e também troque no arquivo api.ts

Inicie o metro bundler

<pre>yarn start</pre>

Inicie o emulador android

<pre>yarn android</pre>

# Imagens do projeto
![tela_inicial](https://github.com/MiguelBragaGarcia/GoMarketPlace/blob/master/Project%20Images/Tela%20Inicial.png =640x480)
![carrinho](https://github.com/MiguelBragaGarcia/GoMarketPlace/blob/master/Project%20Images/Carrinho.png)
