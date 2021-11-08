enum BlockType {
    Character,
    Action,
    Instruction,
    SecondaryInstruction,
    Condition,
    Item, 
    Environment,
    Number
}

const Characters = {
    Bart: 'bart',
    Kevin: 'kevin',
    Dinny: 'dinny',
    Harry: 'harry',
    Charlie: 'charlie',
    Cyclops: 'cyclops',
    Nosy: 'nosy',
    MrMustache: 'mustache',
    MsBrocoli: 'ms. brocoli'
}

const Actions = {
    Move: 'avancer',
    Jump: 'sauter',
    Grab: 'ramasser',
    Use: 'utiliser',
    Speak: 'parler'
}

const Instructions = {
    For: 'repeter',
    While: 'tant que',
    If: 'si'
}

const SecondaryInstructions = {
    Elif: 'ou si',
    Else: 'sinon',
    End: 'fin instruction'
}

const Conditions = {
    IsInFront: "etre devant",
    IsOn: "etre sur",
    Possess: "posseder"
}

const Items = {
    Key: 'cle',
    Plush: 'peluche',
    Flower: 'fleur',
    Machete: 'machette',
    Trash: 'dechet',
    Grass: 'grass'
}

const Environments = {
    Door: 'porte',
    Chair: 'chaise',
    Bush: 'buisson',
    Puddle: 'flaque',
    Bin: 'poubelle',
    Flag: 'drapeau',
}

export { BlockType, Characters, Actions, Instructions, SecondaryInstructions, Items, Environments, Conditions };