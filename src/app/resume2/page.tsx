export default function Resume() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Nome e Contato */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">JULIANA SILVA</h1>
        <p className="text-xl">Redatora e Social Media</p>
        <div className="flex justify-center items-center mt-4">
          <p className="mr-4">
            <span role="img" aria-label="phone">📞</span> (12) 3456-7890
          </p>
          <p>
            <span role="img" aria-label="email">📧</span> ola@grandesite.com.br
          </p>
        </div>
      </header>

      {/* Objetivos */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">OBJETIVOS</h2>
        <p>
          Meu objetivo é aumentar a visibilidade da empresa e o alcance da marca, engajar com o público e promover a fidelidade do cliente utilizando a comunicação efetiva, criatividade, conhecimento em gramática e ortografia, capacidade de trabalhar com prazos e adaptabilidade a diferentes temas e audiências.
        </p>
      </section>

      {/* Formação */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">FORMAÇÃO</h2>
        <ul>
          <li className="mb-4">
            <strong>2010 - 2014 | FACULDADE BORCELLE DE COMUNICAÇÃO</strong>
            <p>Publicidade e Propaganda</p>
          </li>
          <li>
            <strong>2016 - 2019 | FACULDADE FAUSTINO</strong>
            <p>Marketing Digital</p>
          </li>
        </ul>
      </section>

      {/* Experiências */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">EXPERIÊNCIAS</h2>
        <ul>
          <li className="mb-4">
            <strong>2010 - 2014 | AGÊNCIA DE PUBLICIDADE LIA E CIA</strong>
            <p>Redatora de Conteúdo</p>
            <p>Pesquisa, escrita, edição e revisão de conteúdo para diversos veículos de comunicação, como jornais, revistas, sites e redes sociais.</p>
          </li>
          <li className="mb-4">
            <strong>2014 - 2019 | EMPRESA BORCELLE</strong>
            <p>Social Media</p>
            <p>Criação e gerenciamento de conteúdo para as plataformas. Análise de desempenho das postagens e campanhas, planejamento de estratégias de marketing digital.</p>
          </li>
          <li>
            <strong>2019 - 2023 | EMPRESA FAUSTINO DE MARKETING</strong>
            <p>Líder de Redes Sociais</p>
            <p>Gerenciamento da equipe de redes sociais, análise de dados de mercado e do público-alvo, identificando tendências e oportunidades de negócios.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};
