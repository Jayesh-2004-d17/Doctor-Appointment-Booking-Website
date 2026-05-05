import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";


// ✅ CHANGE AVAILABILITY
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);

        // ✅ check doctor exists
        if (!docData) {
            return res.json({
                success: false,
                message: "Doctor not found"
            });
        }

        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        });

        res.json({
            success: true,
            message: "Availability Changed"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ✅ GET ALL DOCTORS
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel
            .find({})
            .select("-password -email");   // cleaner

        res.json({
            success: true,
            doctors
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API for doctor login
const loginDoctor = async (req,res) => {
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success: false, message: 'Inavlid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        }
        else{
             res.json({success: false, message: 'Inavlid Credentials'})
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get doctor appointment for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.userId   // ✅ token se lo

    const appointments = await appointmentModel.find({ docId })

    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const docId = req.userId   // 🔥 token se lo

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })

      return res.json({ success: true, message: "Appointment Completed" })
    } else {
      return res.json({ success: false, message: "Mark Failed" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// API to Cancel appointment  for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body     // ✅ body se
    const docId = req.userId               // ✅ token se

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

      return res.json({ success: true, message: "Appointment Cancelled" })
    } else {
      return res.json({ success: false, message: "Cancellation Failed" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.userId   // 🔥 token se lo

    const appointments = await appointmentModel.find({ docId })

    let earnings = 0

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })

    let patients = []

    appointments.forEach((item) => {
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString())
      }
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.slice().reverse().slice(0, 5) // safe reverse
    }

    res.json({ success: true, dashData })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.userId   // 🔥 token se lo

    const profileData = await doctorModel
      .findById(docId)
      .select('-password')

    res.json({ success: true, profileData })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.userId   // 🔥 token se lo
    const { fees, address, available } = req.body

    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available
    })

    res.json({ success: true, message: 'Profile Updated' })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile };