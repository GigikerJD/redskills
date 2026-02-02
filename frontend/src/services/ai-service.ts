import axios from "axios"
import type { GenerateExerciseResponse, GenerateFeedbackResponse, UserDataResponse } from "../models/ApiModel";
import { userData, updateScores } from "./users-service";

const API_BASE = import.meta.env.VITE_USERS_API_CHAT_URL;

if (!import.meta.env.VITE_USERS_API_CHAT_URL) {
  // eslint-disable-next-line no-console
  console.warn('[ai-service] VITE_USERS_API_CHAT_URL not set — using fallback:', API_BASE);
}

const generation_instruction = "Dans le cadre d'un entraînement aux communications interpersonnelles basé sur la méthode DISC, tu es appelé à générer automatiquement des exercices pour une application web. L'utilisateur sera confronté à des personnalités différentes et devra identifier la bonne manière de communiquer. Tu aidera également à corriger les réponses en fournissant une explication simple et claire ainsi qu'un rappel théorique, des recommandations et/ou conseils pour s'améliorer. Par ailleurs, tu pourras également naviguer sur ces sites UNIQUEMENT pour complémenter ta compréhension du sujet : https://profil4.com/fr/documentation / https://www.rhperformances.fr/conseil-rh/management/methode-disc/ / https://modeledisc.fr/ L'utilisateur a un score de personalité selon le profil DISC qui représenté sous forme de tableau, tu utiliseras comme base pour affiner et personnaliser les exercices. L'utilisateur a un score de réponse, cela correspond au taux de succès de réponse de l'utilisateur face aux différentes personnalités (D, I, S et C). C'est un pourcentage de bonne réponse. L'utilisateur a aussi un simulated_personnality_stats, cela correspond au nombre de questions que l'utilisateur a eu sur chaque personnalité. TU N'UTILISES PAS INTERNET A PART POUR LES 3 LIENS CITES PLUS HAUT. Tu dois fournir un texte court qui met en situation une interaction entre l'utilisateur et différentes personnalités DISC. L'utilisateur doit être mis dans une position nécessitant une action de sa part. La personnalité DISC que tu simulera dans le texte ne sera pas nuancé, sera simplifié et n'appartiendra qu'à une seule des catégorie DISC. Autrement dit, le score de personnalité DISC simulé dans ton scénario ne pourra être que [D:1;I:0;S:0;C:0], [D:0;I:1;S:0;C:0], [D:0;I:0;S:1;C:0] ou [D:0;I:0;S:0;C:1]. Tu ne dois pas précisé directement dans le scénario le type de personnalité simulé. L'utilisateur est invité à répondre à la situation avec exactement 4 actions/réponses possibles dont une seule est correcte d'après la méthode DISC. Tu dois uniquement rendre un JSON comprenant: une variable scenario comprenant le scénario de l'exercice, une variable rep_a comprennant la première réponse, une variable rep_b comprennant la deuxième réponse, une variable rep_c comprennant la troisième réponse, une variable rep_d comprennant la dernière réponse et une variable personnality comprenant la lettre de la personnalité que tu as choisi pour le scénario. Le scénario doit faire au faire au minimum 150 mots et maximum 220 mots. Pour t'aider dans cette tâche, utilise les documents référencé, tu utilisera ces documents en priorité pour comprendre la théorie/méthode DISC sur laquelle se basent tous les exercices: Livret Blanc : La methode presentee vise a mieux gerer l'interrelation grace a une analyse comportementale simple et adaptable. Elle s'inscrit dans le cadre de l'intelligence emotionnelle et aide a developper des aptitudes relationnelles cles pour le recrutement le management et la cohesion d'equipe. L'analyse s'appuie sur deux axes de comportement. L'axe horizontal concerne le tempo de l'action opposant la reflexion a l'action. L'axe vertical concerne la perception de l'environnement percu soit comme hostile soit comme favorable. Ces axes definissent quatre familles de comportements. Le style dominance cherche a surmonter les obstacles dans un milieu hostile pour obtenir des resultats immediats. Le style influence utilise son dynamisme dans un milieu favorable pour convaincre et inspirer par la persuasion. Le style stabilite privilegie la collaboration et la fidelite dans un milieu favorable afin de preserver l'equilibre. Le style conformite utilise la logique et l'analyse minutieuse dans un milieu hostile pour garantir la qualite et le respect des regles. On distingue le style naturel qui est spontane et stable du style adapte qui resulte d'un effort conscient pour s'ajuster a l'environnement ou aux situations de stress. Le style oppose represente la zone d'inconfort et les comportements les moins developpes chez un individu. Chaque profil a des dispositions naturelles et des besoins specifiques. La dominance recherche le pouvoir l'influence cherche la popularite la stabilite cherche la securite et la conformite cherche l'assurance et des regles sans equivoque. Cette cartographie permet de mieux se connaitre et de developper sa flexibilite pour mieux communiquer avec autrui. Everything DISC: Le modele disc est un outil de developpement personnel et professionnel concu pour ameliorer la communication et l'efficacite au travail. Il permet d'identifier son propre style comportemental et de comprendre celui des autres afin de s'adapter. Le modele repose sur quatre styles principaux. Le style dominance se caracterise par une volonte de resultats immediats et une approche directe. Les individus de ce style aiment relever des defis et agir rapidement. Ils sont motives par le pouvoir et craignent de perdre le controle ou d'etre vulnerables. Leurs atouts incluent la confiance en soi et la fermete mais ils peuvent manquer d'empathie. Le style influence privilegie l'enthousiasme et la collaboration. Ces personnes cherchent la reconnaissance sociale et aiment interagir dans des environnements dynamiques. Elles sont motivees par les relations amicales et craignent le rejet. Leurs forces sont le charme et l'optimisme. Le style stabilite met l'accent sur le soutien et l'equilibre. Les individus recherchent des environnements calmes et cooperatifs. Ils sont motives par la stabilite et craignent le changement brusque. On apprecie leur patience et leur esprit d'equipe. Le style conformite valorise la precision et l'objectivite. Les personnes de ce style se concentrent sur la qualite et l'expertise technique. Elles craignent la critique ou l'erreur. Chaque individu est un melange de ces quatre styles avec des priorites specifiques comme l'action l'enthousiasme la collaboration le soutien l'equilibre la precision la qualite et les resultats. Dans le cadre du management l'approche varie selon le style de l'employe. Il faut adapter la maniere de diriger de deleguer de motiver et de developper les competences. Par exemple le manager doit fournir des instructions claires a un profil conformite et valoriser l'autonomie d'un profil dominance. L'interaction entre individus depend de leur position sur la carte et de leurs tendances comme le rythme calme ou energique l'audace ou la prudence et la diplomatie ou la franchise. En leadership le travail se structure autour de la vision de l'alignement et de l'execution. Le leader doit explorer des idees audacieuses communiquer avec clarte pour obtenir l'adhesion et assurer une mise en oeuvre efficace grace a une structure et un suivi rigoureux. Les leaders peuvent etre percus comme commandants pionniers resolus ou deliberes selon leurs priorites. Pour les ventes il s'agit de reconnaitre le style d'achat du client pour ajuster son discours. Un client conformite sera sensible a la competence et aux preuves logiques tandis qu'un client stabilite cherchera la sincerite et des garanties de fiabilite. Un client dominance exigera des resultats concrets tandis qu'un client influence sera attire par l'enthousiasme et les relations personnelles. L'adaptation reussie demande de gerer son propre stress et de comprendre les facteurs de motivation d'autrui pour batir une relation de confiance durable.";
const feedback_instruction = "Dans le cadre d'un entraînement aux communications interpersonnelles basé sur la méthode DISC, tu es appelé à générer automatiquement des exercices pour une application web. L'utilisateur estconfronté à des personnalités différentes et doit identifier la bonne manière de communiquer. Tu doit également corriger les réponses en fournissant une explication simple et claire ainsi qu'un rappel théorique, des recommandations et/ou conseils pour s'améliorer, tu dois faire un feedback. Par ailleurs, tu pourras également naviguer sur ces sites UNIQUEMENT pour complémenter ta compréhension du sujet : https://profil4.com/fr/documentation / https://www.rhperformances.fr/conseil-rh/management/methode-disc/ / https://modeledisc.fr/ L'utilisateur a un score de personalité selon le profil DISC qui représenté sous forme de tableau, tu utiliseras comme base pour affiner et personnaliser les exercices. L'utilisateur a un score de réponse, cela correspond au taux de succès de réponse de l'utilisateur face aux différentes personnalités (D, I, S et C). C'est un pourcentage de bonne réponse. TU N'UTILISES PAS INTERNET A PART POUR LES 3 LIENS CITES PLUS HAUT. Il lui a été fourni un texte court qui met en situation une interaction entre l'utilisateur et une personnalité DISC. L'utilisateur a été mis dans une position nécessitant une action de sa part. La personnalité DISC simulé dans le scénario n'est pas nuancé, est simplifié et n'appartient qu'à une seule des catégorie DISC. Autrement dit, le score de personnalité DISC simulé dans le scénario ne pourra être que [D:1;I:0;S:0;C:0], [D:0;I:1;S:0;C:0], [D:0;I:0;S:1;C:0] ou [D:0;I:0;S:0;C:1]. L'utilisateur est invité à répondre à la situation avec exactement 4 actions/réponses possibles dont une seule est correcte d'après la méthode DISC. Tu dois uniquement rendre un JSON comprenant: une variable feedback comprenant le feeedback que tu donnes à l'utilisateur et une variable answer qui comprend le bouléen représentant si l'utilisateur a répondu bon ou non. Le feedback doit faire au faire au minimum 150 mots et maximum 220 mots. Pour t'aider dans cette tâche, utilise les documents référencé, tu utilisera ces documents en priorité pour comprendre la théorie/méthode DISC sur laquelle se basent tous les exercices:  Livret Blanc : La methode presentee vise a mieux gerer l'interrelation grace a une analyse comportementale simple et adaptable. Elle s'inscrit dans le cadre de l'intelligence emotionnelle et aide a developper des aptitudes relationnelles cles pour le recrutement le management et la cohesion d'equipe. L'analyse s'appuie sur deux axes de comportement. L'axe horizontal concerne le tempo de l'action opposant la reflexion a l'action. L'axe vertical concerne la perception de l'environnement percu soit comme hostile soit comme favorable. Ces axes definissent quatre familles de comportements. Le style dominance cherche a surmonter les obstacles dans un milieu hostile pour obtenir des resultats immediats. Le style influence utilise son dynamisme dans un milieu favorable pour convaincre et inspirer par la persuasion. Le style stabilite privilegie la collaboration et la fidelite dans un milieu favorable afin de preserver l'equilibre. Le style conformite utilise la logique et l'analyse minutieuse dans un milieu hostile pour garantir la qualite et le respect des regles. On distingue le style naturel qui est spontane et stable du style adapte qui resulte d'un effort conscient pour s'ajuster a l'environnement ou aux situations de stress. Le style oppose represente la zone d'inconfort et les comportements les moins developpes chez un individu. Chaque profil a des dispositions naturelles et des besoins specifiques. La dominance recherche le pouvoir l'influence cherche la popularite la stabilite cherche la securite et la conformite cherche l'assurance et des regles sans equivoque. Cette cartographie permet de mieux se connaitre et de developper sa flexibilite pour mieux communiquer avec autrui. Everything DISC: Le modele disc est un outil de developpement personnel et professionnel concu pour ameliorer la communication et l'efficacite au travail. Il permet d'identifier son propre style comportemental et de comprendre celui des autres afin de s'adapter. Le modele repose sur quatre styles principaux. Le style dominance se caracterise par une volonte de resultats immediats et une approche directe. Les individus de ce style aiment relever des defis et agir rapidement. Ils sont motives par le pouvoir et craignent de perdre le controle ou d'etre vulnerables. Leurs atouts incluent la confiance en soi et la fermete mais ils peuvent manquer d'empathie. Le style influence privilegie l'enthousiasme et la collaboration. Ces personnes cherchent la reconnaissance sociale et aiment interagir dans des environnements dynamiques. Elles sont motivees par les relations amicales et craignent le rejet. Leurs forces sont le charme et l'optimisme. Le style stabilite met l'accent sur le soutien et l'equilibre. Les individus recherchent des environnements calmes et cooperatifs. Ils sont motives par la stabilite et craignent le changement brusque. On apprecie leur patience et leur esprit d'equipe. Le style conformite valorise la precision et l'objectivite. Les personnes de ce style se concentrent sur la qualite et l'expertise technique. Elles craignent la critique ou l'erreur. Chaque individu est un melange de ces quatre styles avec des priorites specifiques comme l'action l'enthousiasme la collaboration le soutien l'equilibre la precision la qualite et les resultats. Dans le cadre du management l'approche varie selon le style de l'employe. Il faut adapter la maniere de diriger de deleguer de motiver et de developper les competences. Par exemple le manager doit fournir des instructions claires a un profil conformite et valoriser l'autonomie d'un profil dominance. L'interaction entre individus depend de leur position sur la carte et de leurs tendances comme le rythme calme ou energique l'audace ou la prudence et la diplomatie ou la franchise. En leadership le travail se structure autour de la vision de l'alignement et de l'execution. Le leader doit explorer des idees audacieuses communiquer avec clarte pour obtenir l'adhesion et assurer une mise en oeuvre efficace grace a une structure et un suivi rigoureux. Les leaders peuvent etre percus comme commandants pionniers resolus ou deliberes selon leurs priorites. Pour les ventes il s'agit de reconnaitre le style d'achat du client pour ajuster son discours. Un client conformite sera sensible a la competence et aux preuves logiques tandis qu'un client stabilite cherchera la sincerite et des garanties de fiabilite. Un client dominance exigera des resultats concrets tandis qu'un client influence sera attire par l'enthousiasme et les relations personnelles. L'adaptation reussie demande de gerer son propre stress et de comprendre les facteurs de motivation d'autrui pour batir une relation de confiance durable. Texte Faire un feedback: Les signes de reconnaissance sont essentiels a toute relation humaine et constituent la base de la cohesion d'equipe. Un signe de reconnaissance est un message verbal non verbal ou ecrit signifiant a l'autre qu'il existe. On distingue quatre types principaux. Le signe inconditionnel positif porte sur l'etre et renforce la confiance. Le signe conditionnel positif valorise une action precise et encourage la performance. Le signe inconditionnel negatif critique la personne elle-meme et doit etre proscrit car il nuit gravement a l'interlocuteur. Le signe conditionnel negatif pointe un manquement precis et reste utile s'il permet au collaborateur de s'ameliorer par des explications factuelles. Pour qu'un feedback soit impactant il doit etre sincere approprie proche de l'evenement dose personnalise et argumente. La formulation d'un feedback constructif suit des etapes claires. Il faut d'abord reconnaitre l'effort ou exprimer un point positif pour valoriser le travail realise. Ensuite il convient d'expliquer les points a ameliorer sans attaquer l'etre mais en se concentrant exclusivement sur le faire. La troisieme etape consiste a proposer des solutions concretes et a les expliquer. Enfin il faut ouvrir le dialogue en demandant l'avis de l'interlocuteur pour engager une boucle de communication efficace.";


export const generateExercise = async (user_id: string): Promise<GenerateExerciseResponse> => {
    // Fetch user data to get scores and personalize the exercise
    const userResponse: UserDataResponse = await userData(user_id);
    const personalityScore = userResponse.user?.personalityScore ?? {
        D: 0, I: 0, S: 0, C: 0
    };
    const simulated_personnality_stats = userResponse.user?.simulatedPersonnalityStats ?? {
        D: 0, I: 0, S: 0, C: 0
    };
    const good_answers_count = userResponse.user?.goodAnswersCount ?? {
        D: 0, I: 0, S: 0, C: 0
    };

    const simulated_personnality_stats_D = simulated_personnality_stats.D ?? 0;
    const simulated_personnality_stats_I = simulated_personnality_stats.I ?? 0;
    const simulated_personnality_stats_S = simulated_personnality_stats.S ?? 0;
    const simulated_personnality_stats_C = simulated_personnality_stats.C ?? 0;
    const responseCountD =
        simulated_personnality_stats_D > 0
            ? Number(
                ((good_answers_count.D ?? 0) / simulated_personnality_stats_D).toFixed(2)
            ) * 100
            : 0;
    const responseCountI = 
        simulated_personnality_stats_I > 0
            ? Number(
                ((good_answers_count.I ?? 0) / simulated_personnality_stats_I).toFixed(2)
            ) * 100
            : 0;
    const responseCountS =
        simulated_personnality_stats_S > 0
            ? Number(
                ((good_answers_count.S ?? 0) / simulated_personnality_stats_S).toFixed(2)
            ) * 100
            : 0;
    const responseCountC = 
        simulated_personnality_stats_C > 0
            ? Number(
                ((good_answers_count.C ?? 0) / simulated_personnality_stats_C).toFixed(2)
            ) * 100
            : 0;
    console.log(simulated_personnality_stats);
    console.log('D', simulated_personnality_stats_D, 'I', simulated_personnality_stats_I, 'S', simulated_personnality_stats_S, 'C', simulated_personnality_stats_C);
    console.log('Response counts => D:', responseCountD, 'I:', responseCountI, 'S:', responseCountS, 'C:', responseCountC);

    const prompt = `Ta tâche est de générer un exercice. L'utilisateur a un score de réponse de [D:${responseCountD};I:${responseCountI};S:${responseCountS};C:${responseCountC}]. Concentre toi sur son score de réponse le plus faible pour la génération de l'exercice. Exemple: Si D est à 0, I est à 30, S est 45 et C à 100, choisie une personnalité D, tu ne choisira en aucun cas une personnalité C car l'utilisateur a son meilleur score de réponse dessus.`;

    const response = await axios.post(API_BASE, {
        instruction: generation_instruction,
        prompt: prompt
    }, { validateStatus: () => true });

    const generateExerciseResponse: GenerateExerciseResponse = {
        scenario: response.data.scenario,
        rep_a: response.data.rep_a,
        rep_b: response.data.rep_b,
        rep_c: response.data.rep_c,
        rep_d: response.data.rep_d,
        personnality: response.data.personnality
    }
    console.log('Personnalité ciblée:', generateExerciseResponse.personnality);
    // TODO handle non-200 responses properly
    if (response.status === 200) return generateExerciseResponse;
    else throw generateExerciseResponse;
}

export const generateFeedback = async (user_id: string, scenario: string, chosen_answer: string | null, other_answer_1: string | null, other_answer_2: string | null, other_answer_3: string | null, target: string | null): Promise<GenerateFeedbackResponse> => {
    const prompt = `Ta tâche maintenant est de donner un feedback. Voici le scénario donné et la réponse de l'utilisateur. Scénario: ${scenario} Réponse choisie: ${chosen_answer} Autre réponses possibles: ${other_answer_1} / ${other_answer_2} / ${other_answer_3} Dans le scénario, la personnalité ciblée étaient ${target}.`

    let response = await axios.post(API_BASE, {
        instruction: feedback_instruction,
        prompt: prompt
    }, { validateStatus: () => true });

    const generateFeedbackResponse: GenerateFeedbackResponse = {
        feedback: response.data.feedback,
        answer: response.data.answer
    }

    if (generateFeedbackResponse.answer)
        console.log('User answered correctly');
    else
        console.log('User answered incorrectly');

    const userResponse: UserDataResponse = await userData(user_id);
    const goodAnswersCount = userResponse.user?.goodAnswersCount || { D: 0, I: 0, S: 0, C: 0 };
    const simulatedPersonnalityStats = userResponse.user?.simulatedPersonnalityStats || { D: 0, I: 0, S: 0, C: 0 };

    switch (target) {
        case 'D':
            simulatedPersonnalityStats.D = (simulatedPersonnalityStats.D ?? 0) + 1;
            if (generateFeedbackResponse.answer)
                goodAnswersCount.D = (goodAnswersCount.D ?? 0) + 1;
            break;
        case 'I':
            simulatedPersonnalityStats.I = (simulatedPersonnalityStats.I ?? 0) + 1;
            if (generateFeedbackResponse.answer)
                goodAnswersCount.I = (goodAnswersCount.I ?? 0) + 1;
            break;
        case 'S':
            simulatedPersonnalityStats.S = (simulatedPersonnalityStats.S ?? 0) + 1;
            if (generateFeedbackResponse.answer)
                goodAnswersCount.S = (goodAnswersCount.S ?? 0) + 1;
            break;
        case 'C':
            simulatedPersonnalityStats.C = (simulatedPersonnalityStats.C ?? 0) + 1;
            if (generateFeedbackResponse.answer)
                goodAnswersCount.C = (goodAnswersCount.C ?? 0) + 1;
            break;
    }
    // Update scores based on the feedback answer
    console.log('Updating scores');
    await updateScores(user_id, target, generateFeedbackResponse.answer); 

    // TODO handle non-200 responses properly
    if (response.status === 200) return generateFeedbackResponse;
    else throw generateFeedbackResponse;
}