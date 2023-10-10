import mongoose from 'mongoose';
import { Password } from '../services/password';
//Interface that describes a User typescipt porpuses
interface UserAttrs {
  email: string;
  password: string;
  name: string;
  photoUrl: string;
  rating: number;
  biography: string;
  contact: string;
  birthDate: string;
  risk: string;
  cardioIllnes: string;
  heartAtack: string;
  smoke: string;
  colesterol: string;
  diabetes: string;
  pressure: Array<string>;
  activity: Array<string>;
  balance: Array<string>;
  cronicDesease: string;
  medication: string;
  boneIllness: string;
  medicalSuvervision: string;
  artriteOrRelated: string;
  artriteMeds: string;
  articularProblems: string;
  injections: string;
  cancer: string;
  cancertType: string;
  cancerTreatment: string;
  heartProblem: string;
  controllingHeartCondition: string;
  irregularHeartStrokes: string;
  insufficentCardiac: string;
  activityCronicDesiese: string;
  highPressure: string;
  highPressureMeds: string;
  highPressureRelaxed: string;
  metabolicProblem: string;
  hipoglicemy: string;
  diabetesComplication: string;
  intenseExercise: string;
  mentalIllness: string;
  mentalIllnessMeds: string;
  downSindrome: string;
  breathingIllness: string;
  breathingIllnessMeds: string;
  lowOxygen: string;
  asmatic: string;
  highBloodPressure: string;
  spinal: string;
  spinalMeds: string;
  lowBloodPressure: string;
  bloodPressureSurges: string;
  stroke: string;
  strokeMeds: string;
  compromisedMobility: string;
  strokeOrMuscle: string;
  metabolicProblemMeds: string;
  metabolicOther: string;
  otherHealthProblems: string;
  concussion: string;
  otherProblems: string;
  illness: string;
  cronicIllness: string;
  medications: string;
  boneIllnessList: string;
  twoOrMoreProblems: string;
}

//Interface that describes a UserModel
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//Interface that describes the properties a Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  photoUrl: string;
  rating: number;
  biography: string;
  contact: string;
  birthDate: string;
  risk: string;
  cardioIllnes: string;
  heartAtack: string;
  smoke: string;
  colesterol: string;
  diabetes: string;
  pressure: Array<string>;
  activity: Array<string>;
  balance: Array<string>;
  cronicDesease: string;
  medication: string;
  boneIllness: string;
  medicalSuvervision: string;
  artriteOrRelated: string;
  artriteMeds: string;
  articularProblems: string;
  injections: string;
  cancer: string;
  cancertType: string;
  cancerTreatment: string;
  heartProblem: string;
  controllingHeartCondition: string;
  irregularHeartStrokes: string;
  insufficentCardiac: string;
  activityCronicDesiese: string;
  highPressure: string;
  highPressureMeds: string;
  highPressureRelaxed: string;
  metabolicProblem: string;
  hipoglicemy: string;
  diabetesComplication: string;
  intenseExercise: string;
  mentalIllness: string;
  mentalIllnessMeds: string;
  downSindrome: string;
  breathingIllness: string;
  breathingIllnessMeds: string;
  lowOxygen: string;
  asmatic: string;
  highBloodPressure: string;
  spinal: string;
  spinalMeds: string;
  lowBloodPressure: string;
  bloodPressureSurges: string;
  stroke: string;
  strokeMeds: string;
  compromisedMobility: string;
  strokeOrMuscle: string;
  metabolicProblemMeds: string;
  metabolicOther: string;
  otherHealthProblems: string;
  concussion: string;
  otherProblems: string;
  illness: string;
  cronicIllness: string;
  medications: string;
  boneIllnessList: string;
  twoOrMoreProblems: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,
    },
    biography: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    birthDate: {
      type: String,
      required: false,
    },
    risk: {
      type: String,
      required: false,
    },

    cardioIllnes: {
      type: String,
      required: false,
    },
    heartAtack: {
      type: String,
      required: false,
    },
    smoke: {
      type: String,
      required: false,
    },
    colesterol: {
      type: String,
      required: false,
    },
    diabetes: {
      type: String,
      required: false,
    },
    pressure: {
      type: Array,
      required: false,
    },
    activity: {
      type: Array,
      required: false,
    },
    balance: {
      type: Array,
      required: false,
    },
    cronicDesease: {
      type: String,
      required: false,
    },
    medication: {
      type: String,
      required: false,
    },
    boneIllness: {
      type: String,
      required: false,
    },
    medicalSuvervision: {
      type: String,
      required: false,
    },
    artriteOrRelated: {
      type: String,
      required: false,
    },
    artriteMeds: {
      type: String,
      required: false,
    },
    articularProblems: {
      type: String,
      required: false,
    },
    injections: {
      type: String,
      required: false,
    },
    cancer: {
      type: String,
      required: false,
    },
    cancertType: {
      type: String,
      required: false,
    },
    cancerTreatment: {
      type: String,
      required: false,
    },
    heartProblem: {
      type: String,
      required: false,
    },
    controllingHeartCondition: {
      type: String,
      required: false,
    },
    irregularHeartStrokes: {
      type: String,
      required: false,
    },
    insufficentCardiac: {
      type: String,
      required: false,
    },
    activityCronicDesiese: {
      type: String,
      required: false,
    },
    highPressure: {
      type: String,
      required: false,
    },
    highPressureMeds: {
      type: String,
      required: false,
    },
    highPressureRelaxed: {
      type: String,
      required: false,
    },
    metabolicProblem: {
      type: String,
      required: false,
    },
    hipoglicemy: {
      type: String,
      required: false,
    },
    diabetesComplication: {
      type: String,
      required: false,
    },
    intenseExercise: {
      type: String,
      required: false,
    },
    mentalIllness: {
      type: String,
      required: false,
    },
    mentalIllnessMeds: {
      type: String,
      required: false,
    },
    downSindrome: {
      type: String,
      required: false,
    },
    breathingIllness: {
      type: String,
      required: false,
    },
    breathingIllnessMeds: {
      type: String,
      required: false,
    },
    lowOxygen: {
      type: String,
      required: false,
    },
    asmatic: {
      type: String,
      required: false,
    },
    highBloodPressure: {
      type: String,
      required: false,
    },
    spinal: {
      type: String,
      required: false,
    },
    spinalMeds: {
      type: String,
      required: false,
    },
    lowBloodPressure: {
      type: String,
      required: false,
    },
    bloodPressureSurges: {
      type: String,
      required: false,
    },
    stroke: {
      type: String,
      required: false,
    },
    strokeMeds: {
      type: String,
      required: false,
    },
    compromisedMobility: {
      type: String,
      required: false,
    },
    strokeOrMuscle: {
      type: String,
      required: false,
    },
    metabolicProblemMeds: {
      type: String,
      required: false,
    },
    metabolicOther: {
      type: String,
      required: false,
    },
    otherHealthProblems: {
      type: String,
      required: false,
    },
    concussion: {
      type: String,
      required: false,
    },
    otherProblems: {
      type: String,
      required: false,
    },
    twoOrMoreProblems: {
      type: String,
      required: false,
    },
    illness: {
      type: String,
      required: false,
    },
    cronicIllness: {
      type: String,
      required: false,
    },
    medications: {
      type: String,
      required: false,
    },
    boneIllnessList: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
