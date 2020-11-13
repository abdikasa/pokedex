const allTypes = () => {
  return [
    {
      name: "Normal",
      no_dmg_to: ["Ghost"],
      weaknesses: ["Rock", "Steel"],
      strengths: [],
      no_dmg_from: ["Ghost"],
      weakTo: ["Fighting"],
      resist: [],
    },

    {
      name: "Fire",
      no_dmg_to: [],
      weaknesses: ["Fire", "Water", "Rock", "Dragon"],
      strengths: ["Grass", "Ice", "Bug", "Steel"],
      weakTo: ["Ground", "Rock", "Water"],
      resist: ["Bug", "Steel", "Fire", "Grass", "Ice"],
    },

    {
      name: "Water",
      no_dmg_to: [],
      weaknesses: ["Water", "Grass", "Dragon"],
      strengths: ["Fire", "Ground", "Rock"],
      weakTo: ["Grass", "Electric"],
      resist: ["Steel", "Fire", "Water", "Ice"],
    },

    {
      name: "Electric",
      no_dmg_to: ["Ground"],
      weaknesses: ["Electric", "Grass", "Dragon"],
      strengths: ["Water", "Flying"],
      weakTo: ["Ground"],
      resist: ["Flying", "Steel", "Electric"],
    },

    {
      name: "Grass",
      no_dmg_to: [],
      weaknesses: [
        "Fire",
        "Grass",
        "Poison",
        "Flying",
        "Bug",
        "Dragon",
        "Steel",
      ],
      strengths: ["Water", "Ground", "Rock"],
      weakTo: ["Flying", "Poison", "Bug", "Fire", "Ice"],
      resist: ["Water", "Grass", "Electric", "Ground"],
    },

    {
      name: "Ice",
      no_dmg_to: [],
      weaknesses: ["Fire", "Water", "Ice", "Steel"],
      strengths: ["Grass", "Ground", "Flying", "Dragon"],
      weakTo: ["Fighting", "Rock", "Steel", "Fire"],
      resist: ["Ice"],
    },

    {
      name: "Fighting",
      no_dmg_to: ["Ghost"],
      weaknesses: ["Poison", "Flying", "Psychic", "Bug", "Fairy"],
      strengths: ["Normal", "Ice", "Rock", "Dark", "Steel"],
      weakTo: ["Flying", "Psychic", "Fairy"],
      resist: ["Rock", "Bug", "Dark"],
    },

    {
      name: "Poison",
      no_dmg_to: ["Steel"],
      weaknesses: ["Poison", "Ground", "Rock", "Ghost"],
      strengths: ["Grass", "Fairy"],
      weakTo: ["Ground", "Psychic"],
      resist: ["Fighting", "Poison", "Grass", "Fairy", "Bug"],
    },

    {
      name: "Ground",
      no_dmg_to: ["Flying"],
      weaknesses: ["Grass", "Bug"],
      strengths: ["Fire", "Electric", "Poison", "Rock", "Steel"],
      no_dmg_from: ["Electric"],
      weakTo: ["Water", "Grass", "Ice"],
      resist: ["Poison", "Rock", "Electric"],
    },

    {
      name: "Flying",
      no_dmg_to: [],
      weaknesses: ["Electric", "Rock", "Steel"],
      strengths: ["Grass", "Fighting", "Bug"],
      no_dmg_from: ["Ground"],
      weakTo: ["Rock", "Electric", "Ice"],
      resist: ["Fighting", "Bug", "Grass"],
    },

    {
      name: "Psychic",
      no_dmg_to: ["Dark"],
      weaknesses: ["Psychic", "Steel"],
      strengths: ["Fighting", "Poison"],
      weakTo: ["Bug", "Ghost", "Dark"],
      resist: ["Fighting", "Psychic"],
    },

    {
      name: "Bug",
      no_dmg_to: [],
      weaknesses: [
        "Fire",
        "Fighting",
        "Poison",
        "Flying",
        "Ghost",
        "Steel",
        "Fairy",
      ],
      strengths: ["Grass", "Psychic", "Dark"],
      weakTo: ["Flying", "Rock", "Fire"],
      resist: ["Fighting", "Ground", "Grass"],
    },

    {
      name: "Rock",
      no_dmg_to: [],
      weaknesses: ["Fighting", "Ground", "Steel"],
      strengths: ["Fire", "Ice", "Flying", "Bug"],
      weakTo: ["Fighting", "Ground", "Steel", "Water", "Grass"],
      resist: ["Normal", "Flying", "Poison", "Fire"],
    },

    {
      name: "Ghost",
      no_dmg_to: ["Normal"],
      weaknesses: ["Dark"],
      strengths: ["Psychic", "Ghost"],
      no_dmg_from: ["Normal", "Fighting"],
      weakTo: ["Ghost", "Dark"],
      resist: ["Poison", "Bug"],
    },

    {
      name: "Dragon",
      no_dmg_to: ["Fairy"],
      weaknesses: ["Steel"],
      strengths: ["Dragon"],
      weakTo: ["Dragon", "Fairy"],
      resist: ["Fire", "Water", "Grass", "Electric"],
    },

    {
      name: "Dark",
      no_dmg_to: [],
      weaknesses: ["Fighting", "Dark", "Fairy"],
      strengths: ["Psychic", "Ghost"],
      no_dmg_from: ["Psychic"],
      weakTo: ["Fighting", "Bug", "Fairy"],
      resist: ["Ghost", "Dark"],
    },

    {
      name: "Steel",
      no_dmg_to: [],
      weaknesses: ["Fire", "Water", "Electric", "Steel"],
      strengths: ["Ice", "Rock", "Fairy"],
      no_dmg_from: ["Poison"],
      weakTo: ["Fighting", "Ground", "Fire"],
      resist: [
        "Normal",
        "Flying",
        "Rock",
        "Bug",
        "Steel",
        "Grass",
        "Psychic",
        "Ice",
        "Dragon",
        "Fairy",
      ],
    },

    {
      name: "Fairy",
      no_dmg_to: [],
      weaknesses: ["Fire", "Poison", "Steel"],
      strengths: ["Fighting", "Dragon", "Dark"],
      no_dmg_from: ["Dragon"],
      weakTo: ["Poison", "Steel"],
      resist: ["Fighting", "Bug", "Dragon", "Dark"],
    },
  ];
};

export default allTypes;
