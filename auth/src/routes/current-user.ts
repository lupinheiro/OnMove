import { NotFoundError } from '@mobileorg/common-lib';
import express from 'express';
import { currentUser } from '@mobileorg/common-lib';
import { User } from '../models/user';
const router = express.Router();

router.get('/api/users/currentUser', currentUser, async (req, res) => {
  try {
    const user = await User.findById(req.currentUser?.id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

router.post('/api/users/edit', currentUser, async (req, res) => {
  try {
    const {
      name,
      photoUrl,
      biography,
      contact,
      risk,
      cardioIllnes,
      heartAtack,
      smoke,
      colesterol,
      diabetes,
      pressure,
      activity,
      balance,
      cronicDesease,
      medication,
      boneIllness,
      medicalSuvervision,
      artriteOrRelated,
      artriteMeds,
      articularProblems,
      injections,
      cancer,
      cancertType,
      cancerTreatment,
      heartProblem,
      controllingHeartCondition,
      irregularHeartStrokes,
      insufficentCardiac,
      activityCronicDesiese,
      highPressure,
      highPressureMeds,
      highPressureRelaxed,
      metabolicProblem,
      hipoglicemy,
      diabetesComplication,
      intenseExercise,
      mentalIllness,
      mentalIllnessMeds,
      downSindrome,
      breathingIllness,
      breathingIllnessMeds,
      lowOxygen,
      asmatic,
      highBloodPressure,
      spinal,
      spinalMeds,
      lowBloodPressure,
      bloodPressureSurges,
      stroke,
      strokeMeds,
      compromisedMobility,
      strokeOrMuscle,
      metabolicProblemMeds,
      metabolicOther,
      otherHealthProblems,
      concussion,
      otherProblems,
      twoOrMoreProblems,
      illness,
      cronicIllness,
      boneIllnessList,
      medications,
    } = req.body;
    console.log(req.body);
    const user = await User.findById(req.currentUser?.id);

    if (!user) {
      throw new NotFoundError({ from: 'User not found, verify the user id' });
    }

    user.set({
      name: name || user.name,
      photoUrl: photoUrl || user.photoUrl,
      biography: biography || user.biography,
      contact: contact || user.contact,
      risk: risk || user.risk,
      cardioIllnes: cardioIllnes || user.cardioIllnes,
      heartAtack: heartAtack || user.heartAtack,
      smoke: smoke || user.smoke,
      colesterol: colesterol || user.colesterol,
      boneIllnessList: boneIllnessList || user.boneIllnessList,
      diabetes: diabetes || user.diabetes,
      pressure: pressure || user.pressure,
      activity: activity || user.activity,
      balance: balance || user.balance,
      cronicDesease: cronicDesease || user.cronicDesease,
      medication: medication || user.medication,
      boneIllness: boneIllness || user.boneIllness,
      medicalSuvervision: medicalSuvervision || user.medicalSuvervision,
      artriteOrRelated: artriteOrRelated || user.artriteOrRelated,
      artriteMeds: artriteMeds || user.artriteMeds,
      articularProblems: articularProblems || user.articularProblems,
      injections: injections || user.injections,
      cancer: cancer || user.cancer,
      cancertType: cancertType || user.cancertType,
      cancerTreatment: cancerTreatment || user.cancerTreatment,
      heartProblem: heartProblem || user.heartProblem,
      controllingHeartCondition: controllingHeartCondition || user.controllingHeartCondition,
      irregularHeartStrokes: irregularHeartStrokes || user.irregularHeartStrokes,
      insufficentCardiac: insufficentCardiac || user.insufficentCardiac,
      activityCronicDesiese: activityCronicDesiese || user.activityCronicDesiese,
      highPressure: highPressure || user.highPressure,
      highPressureMeds: highPressureMeds || user.highPressureMeds,
      highPressureRelaxed: highPressureRelaxed || user.highPressureRelaxed,
      metabolicProblem: metabolicProblem || user.metabolicProblem,
      hipoglicemy: hipoglicemy || user.hipoglicemy,
      diabetesComplication: diabetesComplication || user.diabetesComplication,
      intenseExercise: intenseExercise || user.intenseExercise,
      mentalIllness: mentalIllness || user.mentalIllness,
      mentalIllnessMeds: mentalIllnessMeds || user.mentalIllnessMeds,
      downSindrome: downSindrome || user.downSindrome,
      breathingIllness: breathingIllness || user.breathingIllness,
      breathingIllnessMeds: breathingIllnessMeds || user.breathingIllnessMeds,
      lowOxygen: lowOxygen || user.lowOxygen,
      asmatic: asmatic || user.asmatic,
      highBloodPressure: highBloodPressure || user.highBloodPressure,
      spinal: spinal || user.spinal,
      spinalMeds: spinalMeds || user.spinalMeds,
      lowBloodPressure: lowBloodPressure || user.lowBloodPressure,
      bloodPressureSurges: bloodPressureSurges || user.bloodPressureSurges,
      stroke: stroke || user.stroke,
      strokeMeds: strokeMeds || user.strokeMeds,
      compromisedMobility: compromisedMobility || user.compromisedMobility,
      strokeOrMuscle: strokeOrMuscle || user.strokeOrMuscle,
      metabolicProblemMeds: metabolicProblemMeds || user.metabolicProblemMeds,
      metabolicOther: metabolicOther || user.metabolicOther,
      otherHealthProblems: otherHealthProblems || user.otherHealthProblems,
      concussion: concussion || user.concussion,
      otherProblems: otherProblems || user.otherProblems,
      twoOrMoreProblems: twoOrMoreProblems || user.twoOrMoreProblems,
      illness: illness || user.illness,
      cronicIllness: cronicIllness || user.cronicIllness,

      medications: medications || user.medications,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

router.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});
export { router as currentUserRouter };

