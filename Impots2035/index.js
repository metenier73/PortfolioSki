import Engine, { formatValue } from "publicodes";
import rules from "modele-social";

// Changer la valeur ci-dessous pour voir le net s'actualiser
const brut = 3800; // le brut à calculer en €/mois

const engine = new Engine(rules);
const net = engine
  .setSituation({
    "salarié . contrat . salaire brut": brut,
  })
  .evaluate("salarié . rémunération . net . à payer avant impôt");

document.getElementById("app").innerHTML = `
<p> 
  Votre brut : ${formatValue(brut)} <br/>
  Votre net : <strong>${formatValue(net)}</strong>
</p>
`;
i;
