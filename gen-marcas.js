/* ============================================================
   gen-marcas.js — Gerador de Marca (Retalhos da Contracena)
   Registrado no motor RDC (geradores.js). Ver guia-geradores.md §5.6.
   ============================================================ */

(function () {

  // Pool de Marcas — inclui as canônicas de sistema-tags.html
  // (Base, Perda e Superação, Especialização, Relacionamento, Progressão)
  //
  // As 13 Marcas "cozy/melancólicas" (SAUDADE, INSÔNIA, PROMESSA, COSTURA,
  // VIGÍLIA, DÍVIDA, FERRUGEM, COLHEITA, INVERNO, RAIZ, PONTE, HERANÇA, CHAMA)
  // foram absorvidas na categoria Marcas Base — mesma mecânica de Pergunta
  // Pendente e transformação, e já documentadas na tabela de Marcas Base em
  // sistema-tags.html. Ficam listadas ao fim do bloco Base, abaixo.
  //
  // BÊNÇÃO e ENCANTO (Projeto Ecos do Lá Fora, Chat E) entram na mesma
  // categoria e mecânica. Vocabulário para os elementos "vazantes" Sagrado/Fé
  // (7) e Assombro/Maravilha (8) — nunca afirmam deus ou magia como fato, só
  // oferecem a Pergunta Pendente. "ENCANTO" foi escolhido no lugar de
  // "MARAVILHA" para não colidir com o termo já canônico "Maravilha
  // Cotidiana" (gen-artefatos.js / artefatos.html).
  //
  // FERA (Método Deixar Vazar, intensidade "médio") entra na mesma categoria
  // e mecânica — vocabulário para o elemento Fera/Monstro (v6, item 4,
  // "ausente por tese"). Ecoa o Rastro "De Onde Veio" de artefatos.html e o
  // Bestiário de Boatos de gen-retorno.js/sistema-aventureiros.html, sem
  // reabrir nenhum dos dois.
  //
  // cssClass  -> usa a classe .tag já existente na página (marcas base originais)
  // cor       -> usa estilo inline background (marcas base adicionais e demais categorias)
  const MARCAS = [

    // ---------- Marcas Base (canônicas) ----------
    {
      nome: 'VÍNCULO+',
      cssClass: 'tag vinculo-plus',
      origem: 'Nasce de um laço que já provou seu valor — um gesto pequeno e repetido, uma pessoa ou lugar que virou parte da sua rotina sem cerimônia.',
      perguntaPendente: 'O que essa pessoa faria por você que ninguém mais faria?',
      invocacao: '+1 quando a ação nasce diretamente do vínculo (pedir ajuda, confiar um segredo); +2 se o momento colocar esse vínculo à prova de verdade. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao responder a Pergunta Pendente por escrita ou ação, ganha um sufixo pessoal (ex: <em>VÍNCULO+: O Peso do Nome de Kael</em>) e passa a dar +1 automático em rolagens ligadas a essa resposta específica.'
    },
    {
      nome: 'VÍNCULO−',
      cssClass: 'tag vinculo-minus',
      origem: 'Nasce de uma dívida não paga, uma palavra engolida, algo que ficou torto entre vocês dois e nunca foi consertado.',
      perguntaPendente: 'O que vocês evitam dizer um ao outro — e quem vai falar primeiro?',
      invocacao: 'Pode ser invocada como penalidade: −1 no dado para ganhar +1 Retalho, quando a tensão pesa sobre a cena. Como bônus positivo, +1 se a ação for enfrentar a tensão de frente.',
      transformacao: 'Ao responder a Pergunta Pendente, a tensão se resolve ou se aprofunda — vira um sufixo pessoal e, a partir daí, +1 automático em rolagens que envolvam reparar (ou romper de vez) esse laço.'
    },
    {
      nome: 'MISTÉRIO',
      cssClass: 'tag misterio',
      origem: 'Nasce de uma lacuna que se recusa a fechar — algo visto pela metade, uma pergunta que ninguém quis responder direito.',
      perguntaPendente: 'O que você acha que está por trás disso — e por que tem medo de estar certo?',
      invocacao: '+1 ao investigar ou puxar o fio dessa lacuna; +2 se a investigação te expuser a algum risco real. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Responder a Pergunta Pendente — mesmo que a resposta seja parcial — transforma a Marca em um fato assumido, com sufixo pessoal, dando +1 permanente em rolagens sobre esse mistério específico.'
    },
    {
      nome: 'TENSÃO',
      cssClass: 'tag tensao',
      origem: 'Nasce quando algo se aproxima do ponto de ruptura — uma facção, um prazo, uma promessa que não vai se sustentar por muito mais tempo.',
      perguntaPendente: 'Se isso piorar, o que você perde primeiro?',
      invocacao: '+1 ao agir para conter a situação antes que rompa; +2 se agir custar algo caro e imediato. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao responder a Pergunta Pendente — geralmente vivendo a perda que ela nomeia, ou evitando-a por um triz — a Marca ganha sufixo pessoal e +1 automático em rolagens ligadas a essa consequência.'
    },
    {
      nome: 'DOMÉSTICO',
      cssClass: 'tag domestico',
      origem: 'Nasce da rotina que sustenta seus dias — um ritual pequeno, um cômodo, um hábito que virou âncora sem que você notasse.',
      perguntaPendente: 'Que parte da sua rotina você não sobreviveria sem — e o que acontece quando ela é interrompida?',
      invocacao: '+1 em rolagens que envolvam a Contracena, o cotidiano ou o cuidado com o espaço; +2 se a rotina estiver sob ameaça direta. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Quando a rotina é de fato interrompida e você escreve o que isso revela, a Marca ganha sufixo pessoal e passa a dar +1 automático em cenas que envolvam reconstruir ou defender esse hábito.'
    },
    {
      nome: 'MEMÓRIA',
      cssClass: 'tag eco',
      origem: 'Nasce de um momento já vivido e guardado — algo que voltou à tona por um cheiro, um objeto, uma frase repetida fora de hora.',
      perguntaPendente: 'Se pudesse reviver esse momento, mudaria algo — ou tem medo de descobrir que não mudaria nada?',
      invocacao: 'Marcas de Memória já geraram Retalho quando criadas — invocá-las traz +1 adicional em rolagens que revisitem essa lembrança; +2 se reviver a cena exigir enfrentar algo doloroso.',
      transformacao: 'Ao responder a Pergunta Pendente, a lembrança ganha um novo capítulo — sufixo pessoal e +1 automático sempre que essa memória específica voltar a importar.'
    },

    // ---------- Marcas Base (adicionais, absorvidas nesta categoria — tom cozy/melancólico) ----------
    {
      nome: 'SAUDADE',
      cor: 'var(--mystery)',
      origem: 'Nasce de algo que ficou pela metade — uma despedida mal feita, uma estação que acabou cedo demais, uma pessoa que só passou de visita.',
      perguntaPendente: 'O que você faria diferente se soubesse, na hora, que era a última vez?',
      invocacao: '+1 em rolagens de PENA ou BRASA quando o passado se conecta diretamente à cena; +2 se reencontrar de fato o que ficou pela metade. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao escrever o reencontro (real ou imaginado) que responde à Pergunta Pendente, ganha sufixo pessoal e +1 automático em cenas que revisitem esse mesmo capítulo do passado.'
    },
    {
      nome: 'INSÔNIA',
      cor: '#4a2a2a',
      origem: 'Nasce de noites maldormidas por preocupação — algo que segue te esperando quando a Contracena finalmente silencia.',
      perguntaPendente: 'O que você faz nas horas que ninguém vê você acordado?',
      invocacao: '+1 em rolagens de LENTE em cenas noturnas; −1 em BRASA no primeiro Gesto do dia enquanto ativa (custo aceito em troca do bônus). Nunca mais que +2 de bônus na mesma rolagem.',
      transformacao: 'Ao nomear, em voz alta ou por escrito, o que te tira o sono, a Marca se transforma — o sufixo pessoal marca a virada, e +1 passa a valer em rolagens que enfrentem essa causa diretamente.'
    },
    {
      nome: 'PROMESSA',
      cor: 'var(--gold)',
      origem: 'Nasce de um compromisso feito de coração aberto e ainda não cumprido — pode ser a alguém, a si mesmo, ou a um lugar.',
      perguntaPendente: 'O que vai custar cumprir essa promessa — e você ainda está disposto a pagar?',
      invocacao: '+1 em rolagens que aproximem você de cumprir a promessa; +2 no Gesto que efetivamente a cumpre. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao cumprir (ou romper conscientemente) a promessa, a Marca se resolve: ganha sufixo pessoal e concede +1 permanente em rolagens sobre compromissos daquele mesmo tipo.'
    },
    {
      nome: 'COSTURA',
      cor: 'var(--accent)',
      origem: 'Nasce de um reparo visível — algo que você consertou, em um artefato ou em uma relação, e a emenda ficou à mostra.',
      perguntaPendente: 'O reparo ficou mais bonito do que o original — ou só mais honesto?',
      invocacao: '+1 em Curadoria quando o trabalho envolve consertar algo já quebrado antes; +2 se o reparo for de algo simbolicamente importante para você. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Quando alguém nota a emenda e você decide o que responder, a Marca ganha sufixo pessoal e +1 automático em Curadoria sobre reparos do mesmo tipo.'
    },
    {
      nome: 'VIGÍLIA',
      cor: 'var(--tensao, var(--accent))',
      origem: 'Nasce de cuidar de algo ou alguém que exige atenção constante — um artefato instável, um NPC frágil, um segredo que pode escapar.',
      perguntaPendente: 'O que acontece com você quando finalmente baixa a guarda?',
      invocacao: '+1 em rolagens de proteção ou cuidado contínuo; +2 no momento exato em que a vigília é testada por um imprevisto. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao escrever o momento em que você finalmente descansa — ou o momento em que a vigília falha —, a Marca se transforma com sufixo pessoal e +1 automático em cenas ligadas a esse alívio ou essa queda.'
    },
    {
      nome: 'DÍVIDA',
      cor: 'var(--danger)',
      origem: 'Nasce de um favor recebido que ainda não foi retribuído — não em dinheiro, mas em gesto, tempo ou lealdade.',
      perguntaPendente: 'O que essa pessoa vai pedir de volta — e você vai conseguir recusar, se precisar?',
      invocacao: 'Pode ser invocada como penalidade: −1 no dado para ganhar +1 Retalho, quando o peso da dívida pesa sobre a cena. Como ação de saldar, +1 no Gesto que paga a dívida.',
      transformacao: 'Ao saldar a dívida (ou decidir conscientemente não saldá-la), a Marca se resolve: ganha sufixo pessoal e conclui seu efeito mecânico, deixando +1 narrativo permanente sobre esse tipo de favor.'
    },
    {
      nome: 'FERRUGEM',
      cor: '#4a2a2a',
      origem: 'Nasce de uma deterioração lenta — algo se perdendo aos poucos e sem alarde: uma habilidade, um vínculo, um cômodo esquecido.',
      perguntaPendente: 'Quando você notou pela primeira vez que algo estava se perdendo — e por que não fez nada na hora?',
      invocacao: 'Aplica −1 em rolagens diretamente ligadas ao que está enferrujando; pode ser invocada para +1 quando você decide finalmente agir para deter a perda. Nunca mais que +2 de bônus na mesma rolagem.',
      transformacao: 'Ao investir tempo e Fôlego para reverter (ou aceitar) a perda, a Marca se transforma com sufixo pessoal, e a penalidade dá lugar a +1 permanente em rolagens de restauração desse tipo.'
    },
    {
      nome: 'COLHEITA',
      cor: 'var(--success)',
      origem: 'Nasce do resultado de um esforço longo finalmente aparecendo — um projeto, uma amizade, uma habilidade que enfim deu fruto.',
      perguntaPendente: 'Esse resultado é tudo que você esperava — ou também é uma despedida do processo que te trouxe até aqui?',
      invocacao: '+1 em rolagens que colham diretamente o fruto desse esforço; +2 se colher esse fruto exigir abrir mão de outra coisa. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao escrever o que vem depois da colheita — o próximo plantio, ou o vazio que ela deixa —, a Marca ganha sufixo pessoal e +1 automático em cenas sobre recomeçar algo que já deu certo uma vez.'
    },
    {
      nome: 'INVERNO',
      cor: 'var(--mystery)',
      origem: 'Nasce de um período de retração emocional — quando você se fecha um pouco, guarda energia, espera a estação passar.',
      perguntaPendente: 'O que você está esperando passar — e vai reconhecer quando isso acontecer?',
      invocacao: 'Aplica −1 em rolagens sociais que exijam abertura enquanto ativa; pode ser invocada para +1 em rolagens de PENA ou BRASA quando o silêncio em si é a escolha certa. Nunca mais que +2 de bônus na mesma rolagem.',
      transformacao: 'Ao escrever a primeira cena em que você volta a se abrir, a Marca se transforma com sufixo pessoal e passa a dar +1 automático em cenas de retomada depois de um período fechado.'
    },
    {
      nome: 'RAIZ',
      cor: 'var(--success)',
      origem: 'Nasce de um pertencimento profundo a um lugar — a Contracena, um bairro, uma esquina que virou parte de quem você é.',
      perguntaPendente: 'O que aconteceria com você se precisasse ir embora desse lugar amanhã?',
      invocacao: '+1 em rolagens sociais ou de cuidado dentro desse lugar; +2 se o lugar estiver sob ameaça direta. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao responder — na prática — o que aconteceria se você tivesse que partir, a Marca se transforma com sufixo pessoal e +1 automático em rolagens que defendam esse lugar.'
    },
    {
      nome: 'PONTE',
      cor: 'var(--romance)',
      origem: 'Nasce de uma reconciliação em andamento — duas pessoas, ou duas partes de você mesmo, tentando se encontrar de novo depois de um afastamento.',
      perguntaPendente: 'Quem vai dar o primeiro passo dessa vez — e o que acontece se ninguém der?',
      invocacao: '+1 em rolagens de BRASA voltadas a reconciliar; +2 se o gesto de reconciliação for público e arriscado. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao dar (ou recusar definitivamente) esse primeiro passo, a Marca se resolve: ganha sufixo pessoal e +1 permanente em rolagens sobre reparar esse tipo de afastamento.'
    },
    {
      nome: 'HERANÇA',
      cor: 'var(--gold)',
      origem: 'Nasce de algo deixado por alguém antes de você — uma ferramenta, um hábito, uma responsabilidade que não foi escolhida, apenas recebida.',
      perguntaPendente: 'Você quer isso porque é seu — ou porque era de quem veio antes?',
      invocacao: '+1 em rolagens de Curadoria ou Ofício ligadas ao que foi herdado; +2 se usar a herança de um jeito que a pessoa original nunca imaginaria. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao decidir — de fato — o que fazer com a herança (honrar, mudar ou recusar), a Marca ganha sufixo pessoal e +1 automático em cenas sobre esse legado específico.'
    },
    {
      nome: 'CHAMA',
      cor: 'var(--danger)',
      origem: 'Nasce de uma paixão recente e urgente — um interesse, uma pessoa, um projeto que tomou conta de você de repente e sem aviso.',
      perguntaPendente: 'O que você está disposto a deixar de lado por causa dessa urgência?',
      invocacao: '+1 em rolagens que sigam essa urgência com entusiasmo; +2 se seguir a chama significar abrir mão de algo estável. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao escrever o que sobra depois que a urgência inicial esfria — vira hábito, vira decepção, ou vira outra coisa —, a Marca se transforma com sufixo pessoal e +1 automático nessa nova fase.'
    },
    {
      nome: 'BÊNÇÃO',
      cor: 'var(--accent-light)',
      origem: 'Nasce de um gesto de fé oferecido ou recebido — uma prece dita baixo, um ritual da cidade, uma bênção que alguém insistiu em te dar mesmo sem saber se ela "pega". Ninguém aqui afirma que algo maior escutou; só que alguém achou que valia tentar.',
      perguntaPendente: 'Você acredita que aquilo tocou algo maior — ou só precisava acreditar em alguma coisa naquele dia?',
      invocacao: '+1 em rolagens onde o gesto — o ritual, a prece, a bênção — importa mais que o resultado prático; +2 se a cena testar diretamente se você ainda acredita naquilo. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao responder a Pergunta Pendente — decidindo, na prática, se aquilo tinha peso —, a Marca ganha sufixo pessoal (ex: BÊNÇÃO: A Prece que Vovó Insistiu) e passa a dar +1 automático em cenas que revisitem essa fé, respondida ou não.'
    },
    {
      nome: 'ENCANTO',
      cor: 'var(--soft)',
      origem: 'Nasce de um instante de assombro simples — algo comum que, por um segundo, pareceu maior do que era: uma luz estranha na janela, um silêncio grande demais, uma coincidência boa demais pra ser só coincidência. Ninguém aqui garante que era magia; só que você parou para olhar.',
      perguntaPendente: 'O que você faria diferente se soubesse, com certeza, que aquilo era real?',
      invocacao: '+1 em rolagens que busquem entender ou recriar esse instante; +2 se a cena colocar à prova se o assombro era real. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao responder a Pergunta Pendente — escrevendo se você decidiu que aquilo era real, era só um efeito de luz, ou não precisa de nome —, a Marca ganha sufixo pessoal e +1 automático em cenas que revisitem esse mesmo assombro.'
    },
    {
      // Projeto Ecos do Lá Fora — Deixar Vazar (Fera/Monstro, intensidade
      // "médio"). Vocabulário para o rastro de uma criatura clássica de
      // fantasia — nunca afirma que ela existe, só que algo deixou marca.
      // Ecoa o Rastro "De Onde Veio" (artefatos.html) e o Bestiário de
      // Boatos (gen-retorno.js / sistema-aventureiros.html).
      nome: 'FERA',
      cor: 'var(--mystery)',
      origem: 'Nasce de um vestígio que ninguém explica direito — uma garra funda demais na pedra, um pelo grande demais para qualquer bicho catalogado, um boato de estrada que se recusa a morrer. Ninguém aqui afirma que a criatura existe; só que algo, em algum lugar, deixou essa marca.',
      perguntaPendente: 'Você vai dar nome ao que deixou esse rastro — ou prefere que continue sendo lenda de estrada?',
      invocacao: '+1 em rolagens que investiguem, rastreiem ou tentem nomear a origem do vestígio; +2 se a cena colocar diretamente à prova se a fera é real. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Ao responder a Pergunta Pendente — decidindo se a fera é real, se é boato inflado por medo, ou se nunca precisa ser resolvida —, a Marca ganha sufixo pessoal e +1 automático em cenas que revisitem esse mesmo rastro.'
    },

    // ---------- Marcas de Perda e Superação (canônicas) ----------
    {
      nome: 'LUTO',
      cor: 'var(--danger)',
      origem: 'Nasce de uma perda real — a partida de alguém importante, sentida ainda fresca.',
      perguntaPendente: 'O que você ainda não disse a quem partiu — e ainda dá tempo de dizer, de algum jeito?',
      invocacao: 'Não se invoca para bônus: enquanto ativa, aplica −1 em BRASA. Pode ser invocada apenas para justificar uma cena de luto que renda +1 Retalho.',
      transformacao: 'É temporária (3 capítulos) e pode ser removida com um ritual de despedida (1 Fôlego + 1 Retalho). Ao se resolver, deixa +1 permanente em PENA sobre perda.'
    },
    {
      nome: 'CICATRIZ',
      cor: 'var(--mystery)',
      origem: 'Nasce de uma marca física ou emocional deixada por uma expedição ou evento difícil.',
      perguntaPendente: 'Quando alguém a nota, o que você diz — e o que você decide não contar?',
      invocacao: '+1 em rolagens de superação relacionadas à origem da cicatriz, antes mesmo da transformação; +2 se enfrentar diretamente o que a causou. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'Quando transformada — geralmente ao contar a história para alguém que importa — passa a dar +1 permanente em rolagens de superação ligadas à origem da cicatriz.'
    },

    // ---------- Marcas de Especialização (canônicas) ----------
    {
      nome: 'GUERREIRO',
      cor: 'var(--accent)',
      origem: 'Nasce do tempo dedicado ao conflito e ao risco — geralmente marcada por um Cômodo como a Sala de Armas.',
      perguntaPendente: 'Você entende de combate — mas entende por que as pessoas chegam até ele?',
      invocacao: '+1 em rolagens com Quebradores e situações de conflito; +2 se a situação exigir decidir entre proteger e machucar. Nunca mais que +2 na mesma rolagem. É permanente — não pode ser invocada como custo, só como bônus.',
      transformacao: 'É permanente e não se remove. Pode ganhar camadas narrativas (uma história específica associada a ela) sem perder o efeito mecânico base.'
    },
    {
      nome: 'SÁBIO',
      cor: 'var(--mystery)',
      origem: 'Nasce do tempo dedicado ao conhecimento e à pesquisa — geralmente marcada por um Cômodo como a Biblioteca Arcana.',
      perguntaPendente: 'Existe algo que você sabe que preferia não saber?',
      invocacao: '+1 em rolagens com acadêmicos e situações de conhecimento; +2 se o conhecimento em jogo for algo que você guarda a contragosto. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove. A Pergunta Pendente pode ressurgir várias vezes ao longo da campanha, cada vez com um peso diferente.'
    },
    {
      nome: 'OCULTISTA',
      cor: '#4a2a2a',
      origem: 'Nasce do tempo dedicado a segredos e margens — geralmente marcada por um Cômodo como o Arquivo dos Espíritos.',
      perguntaPendente: 'O que você sabe que ninguém mais sabe — e por que ainda não contou?',
      invocacao: '+1 em rolagens com marginais e situações de segredo; +2 se revelar o segredo custar caro. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove. Cada segredo guardado pode virar, com o tempo, um Fio próprio.'
    },

    // ---------- Marcas de Relacionamento (canônicas) ----------
    {
      nome: 'CONFIANÇA',
      cor: 'var(--success)',
      origem: 'Nasce de uma Rota de Romance que chegou à Amizade Profunda — o NPC já confia em você sem precisar de prova.',
      perguntaPendente: 'O que essa confiança te permite fazer que antes seria impensável?',
      invocacao: '+1 em rolagens de BRASA com este NPC; +2 se a cena colocar essa confiança em teste real. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e vinculada ao NPC. Pode evoluir para INTIMIDADE se a Rota de Romance avançar.'
    },
    {
      nome: 'INTIMIDADE',
      cor: 'var(--romance)',
      origem: 'Nasce de uma Rota de Romance que chegou à fase de Romance — vocês compartilham segredos e vulnerabilidades.',
      perguntaPendente: 'O que vocês dois sabem um do outro que mais ninguém sabe?',
      invocacao: '+2 em rolagens de BRASA com este NPC (o teto já é o máximo permitido — não some com outros bônus além do limite de +2 por rolagem).',
      transformacao: 'É permanente e vinculada ao NPC. Pode evoluir para PARCEIRO se a Rota de Romance chegar ao Compromisso.'
    },
    {
      nome: 'PARCEIRO',
      cor: 'var(--gold)',
      origem: 'Nasce de uma Rota de Romance que chegou ao Compromisso — vocês decidiram construir algo que dura.',
      perguntaPendente: 'O que vocês constroem juntos que nenhum dos dois construiria sozinho?',
      invocacao: '+1 em todas as rolagens quando trabalhando ao lado deste NPC; +2 se o trabalho envolver proteger o que vocês construíram juntos. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e vinculada ao NPC. Não se transforma mais — é o topo da Rota de Romance.'
    },
    {
      nome: 'CORAJOSO',
      cor: 'var(--success)',
      origem: 'Nasce da evolução de um Explorador que superou um medo importante diante de você.',
      perguntaPendente: 'O que esse medo superado custou — e o que ele libertou?',
      invocacao: '+1 em rolagens de risco ao lado desse NPC; +2 se o risco reabrir exatamente o medo que ele superou. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e vinculada ao NPC.'
    },
    {
      nome: 'CONFIÁVEL',
      cor: 'var(--romance)',
      origem: 'Nasce da evolução de um Forasteiro que finalmente encontrou um lugar onde confiar.',
      perguntaPendente: 'O que foi preciso para essa confiança nascer — e o que a quebraria de novo?',
      invocacao: '+1 em rolagens de confiança envolvendo esse NPC; +2 se a cena exigir provar essa confiança sob pressão. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e vinculada ao NPC.'
    },

    // ---------- Marcas de Progressão (canônicas) ----------
    {
      nome: 'LENDÁRIO',
      cor: 'var(--gold)',
      origem: 'Nasce de um evento raro de Clima Tempestade — você tocou, ainda que de relance, algo maior do que si mesmo.',
      perguntaPendente: 'O que você fez com isso — e valeu o preço?',
      invocacao: '+1 em restauração de artefatos raros; +2 se o artefato em questão remeter diretamente ao evento que originou a Marca. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove.'
    },
    {
      nome: 'MALDITO',
      cor: 'var(--danger)',
      origem: 'Nasce de um evento raro de Clima Tempestade — algo antigo te tocou e deixou um preço para trás.',
      perguntaPendente: 'Você aceitaria desfazer a maldição se isso apagasse tudo que veio junto com ela?',
      invocacao: 'Aplica −1 em rolagens de sorte; pode ser invocada para +1 em rolagens de superação quando você usa a própria maldição a seu favor. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove — mas a relação com ela pode mudar de tom conforme a Pergunta Pendente é revisitada.'
    },
    {
      nome: 'ACOLHEDOR',
      cor: 'var(--romance)',
      origem: 'Nasce de ter aberto espaço — literal ou emocional — para alguém que não tinha para onde ir.',
      perguntaPendente: 'O que você ganhou ao abrir essa porta — que você não esperava receber?',
      invocacao: '+1 em rolagens com refugiados e comunidades marginalizadas; +2 se acolher custar algo concreto naquele momento. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove.'
    },
    {
      nome: 'PROFETIZADO',
      cor: 'var(--accent)',
      origem: 'Nasce de um evento raro de Clima Tempestade — uma profecia antiga te escolheu, ou você a escolheu de volta.',
      perguntaPendente: 'E se a profecia estiver errada sobre você?',
      invocacao: '+1 em rolagens de mistério; +2 se a cena testar diretamente se a profecia é verdadeira. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove.'
    },
    {
      nome: 'DESPERTADO',
      cor: '#4a2a2a',
      origem: 'Nasce de um evento raro de Clima Tempestade — você acordou algo que dormia havia séculos.',
      perguntaPendente: 'O que desperta junto com o que você acordou?',
      invocacao: 'Não dá bônus numérico direto — habilita eventos divinos ou sobrenaturais como possibilidade narrativa a qualquer momento.',
      transformacao: 'É permanente e não se remove.'
    },
    {
      nome: 'MONUMENTO',
      cor: 'var(--success)',
      origem: 'Nasce de um evento raro de Clima Tempestade — a cidade ergueu algo em nome do que você fez.',
      perguntaPendente: 'Você ainda é a pessoa que fez aquilo — ou virou outra desde então?',
      invocacao: '+1 em rolagens sociais na cidade; +2 se a cena confrontar diretamente a distância entre quem você era e quem você é agora. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove.'
    },
    {
      nome: 'ALIADO',
      cor: 'var(--mystery)',
      origem: 'Nasce de um evento raro de Clima Tempestade — um Círculo poderoso passou a te reconhecer.',
      perguntaPendente: 'O que eles esperam em troca — e você está disposto a dar?',
      invocacao: '+1 em rolagens com Círculos; +2 se a cena cobrar o preço dessa aliança. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove.'
    },
    {
      nome: 'HERÓI',
      cor: 'var(--accent)',
      origem: 'Nasce de um evento raro de Clima Tempestade — uma lenda viva cruzou o seu caminho e deixou marca.',
      perguntaPendente: 'O que você aprendeu com ela que contradiz o que você pensava saber?',
      invocacao: '+1 em rolagens com Quebradores; +2 se a cena testar diretamente essa lição aprendida. Nunca mais que +2 na mesma rolagem.',
      transformacao: 'É permanente e não se remove.'
    }
  ];

  function generateMarca() {
    const escolhida = RDC.pick(MARCAS);
    // clona para evitar qualquer mutação acidental do pool original
    return JSON.parse(JSON.stringify(escolhida));
  }

  function tagHtml(data) {
    if (data.cssClass) {
      return `<span class="${data.cssClass}">${data.nome}</span>`;
    }
    return `<span class="tag" style="background: ${data.cor}; color: var(--parchment);">${data.nome}</span>`;
  }

  function renderMarca(data) {
    return `
      <div class="gen-result">
        <div class="gen-result-title">[ ${tagHtml(data)} ]</div>
        <div class="gen-field">
          <span class="gen-field-label">De onde nasce</span>
          <p>${data.origem}</p>
        </div>
        <div class="gen-field">
          <span class="gen-field-label">Pergunta Pendente</span>
          <p><em>"${data.perguntaPendente}"</em></p>
        </div>
        <div class="gen-field">
          <span class="gen-field-label">Quando invocar (+1/+2)</span>
          <p>${data.invocacao}</p>
        </div>
        <div class="gen-field">
          <span class="gen-field-label">Como se transforma</span>
          <p>${data.transformacao}</p>
        </div>
        <div class="gen-field gen-field-reminder">
          <span class="gen-field-label">Lembrete de teto</span>
          <p>O bônus de Marcas nunca ultrapassa +2 por rolagem, somando todas as Marcas envolvidas — invocadas ou transformadas. O teto é por rolagem, não por Marca (ver <a href="sistema-tags.html#gerador">Sistema: Marcas</a>).</p>
        </div>
      </div>
    `;
  }

  function titleMarca(data) {
    return `[${data.nome}]`;
  }

  RDC.registerGenerator({
    id: 'marca',
    label: 'Marca',
    icon: '🏷️',
    page: 'sistema-tags.html',
    loadingText: 'Lendo o que você carrega...',
    generate: generateMarca,
    render: renderMarca,
    title: titleMarca
  });

})();
