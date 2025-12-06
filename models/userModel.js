const mongoose = require('mongoose');
// On importe le module bcrypt qui permet de hacher des expressions
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    clientName:{
        type        : String,
        minlength   : 2,
        trim        : true,
        required    : [true, 'Le nom est requis'],
    },
    email:{
        type        : String,
        trim        : true,
        required    : [true, 'Email est requis'],
        unique      : true, // index unique
        lowercase   : true
    },
    password:{
        type        : String,
        trim        : true,
        minlength   : 8,
        required    : [true, 'Mot de passe est requis']
    },
    createdAt: {
    type            : Date,
    immutable       : true, // 🔒 jamais modifiable
    default         : () => Date.now()
    }
}, {
    // ajoute 2 champs au document createAt et updateAt
    timestapms      : true
});

// Hash le mot de passa quand il est modifié
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);