import { useState } from "react";
import "./App.css"

const init = {
  firstName:"", lastName:"", email:"",
  country:"India", streetAddress:"", city:"",
  state:"", postalCode:"",
  comments:false, candidates:false, offers:false,
  pushNotifications:""
};

export default function App() {
  const [formData, setFormData] = useState(init);

  const handleChange = ({ target:{ name, type, value, checked } }) =>
    setFormData(prev => ({ ...prev, [name]: type==="checkbox" ? checked : value }));

  const handleSubmit = e => {
    e.preventDefault();
    console.table(formData);
    alert("Saved! (check console)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 bg-white p-8 rounded-2xl shadow">
        {/* —— basic inputs —— */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Text id="firstName"  label="First name"  value={formData.firstName}  onChange={handleChange}/>
          <Text id="lastName"   label="Last name"   value={formData.lastName}   onChange={handleChange}/>
          <Text id="email" type="email" label="Email" value={formData.email} onChange={handleChange} />
          <Select id="country" label="Country" value={formData.country} onChange={handleChange}
                  opts={["India","United States","Canada","Mexico"]}/>
          <Text id="streetAddress" label="Street address" value={formData.streetAddress} onChange={handleChange} className="md:col-span-2"/>
          <Text id="city"  label="City"  value={formData.city}  onChange={handleChange}/>
          <Text id="state" label="State/Province" value={formData.state} onChange={handleChange}/>
          <Text id="postalCode" label="Postal code" value={formData.postalCode} onChange={handleChange}/>
        </div>

        {/* —— checkboxes —— */}
        <Fieldset legend="By email">
          <Check id="comments"   checked={formData.comments}   onChange={handleChange}
                 label="Comments"   hint="Get notified when someone posts a comment." />
          <Check id="candidates" checked={formData.candidates} onChange={handleChange}
                 label="Candidates" hint="Get notified when a candidate applies for a job." />
          <Check id="offers"     checked={formData.offers}     onChange={handleChange}
                 label="Offers"     hint="Get notified when a candidate accepts or rejects an offer." />
        </Fieldset>

        {/* —— radios —— */}
        <Fieldset legend="Push notifications" hint="Delivered via SMS to your phone.">
          {["Everything","Same as email","No push notifications"].map(v => (
            <Radio key={v} name="pushNotifications" value={v}
                   checked={formData.pushNotifications === v}
                   onChange={handleChange} label={v}/>
          ))}
        </Fieldset>

        <button className="w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg">
          Save
        </button>
      </form>
    </div>
  );
}

/* — small reusable primitives — */
function Text({ id, label, className="", ...props }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-1 text-sm font-medium">{label}</label>
      <input id={id} {...props}
        className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500" />
    </div>
  );
}
function Select({ id, label, opts=[], ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-medium">{label}</label>
      <select id={id} {...props}
        className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500">
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
function Check({ id, label, hint, ...props }) {
  return (
    <label htmlFor={id} className="flex gap-3 items-start cursor-pointer">
      <input id={id} type="checkbox" className="mt-1" {...props}/>
      <span><span className="font-medium">{label}</span><br/>
        <span className="text-sm text-gray-600">{hint}</span></span>
    </label>
  );
}
function Radio({ label, ...props }) {
  return (
    <label className="flex gap-3 items-center cursor-pointer">
      <input type="radio" {...props}/>
      <span>{label}</span>
    </label>
  );
}
function Fieldset({ legend, hint, children }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-lg font-medium mb-2">{legend}</legend>
      {hint && <p className="text-sm text-gray-600 mb-1">{hint}</p>}
      {children}
    </fieldset>
  );
}

// import { useState } from "react";
// import "./App.css";

// function App() {

//   const [formData, setFormData] = useState({
//     firstName:"", lastName:"", email:"", country:"India",
//     streetAddress:"", city:"", state:"", postalCode:"",
//     comments:false, candidates:false, offers:false, pushNotifications:""
//   })

//   function changeHandler(event) {
//     const {name, value, checked, type} = event.target;
//     setFormData( (prev) => ({...prev, [name]:type === "checkbox" ? checked: value}) );
//   }

//   function submitHandler(event) {
//     event.preventDefault();

//     console.log("Finally printing the value of Form Data:");
//     console.log(formData)
//   }

//   return (
//    <div className="flex flex-col items-center mt-2">
//    <form onSubmit={submitHandler}>

//     <label htmlFor="firstName">First name</label>
//     <br/>
//     <input
//       type="text"
//       name="firstName"
//       id="firstName"
//       placeholder="Love"
//       value={formData.firstName}
//       onChange={changeHandler}
//       className="outline"
//     />

//     <br/>
//     <label htmlFor="lastName">Last name</label>
//     <br/>
//     <input
//       type="text"
//       name="lastName"
//       id="lastName"
//       placeholder="Babbar"
//       value={formData.lastName}
//       onChange={changeHandler}
//       className="outline"
//     />

//     <br/>
//     <label htmlFor="email">Email Address</label>
//     <br/>
//     <input
//       type="email"
//       name="email"
//       id="email"
//       placeholder="love@abcd.com"
//       value={formData.email}
//       onChange={changeHandler}
//       className="outline"
//     />

//     <br/>
//     <label htmlFor="country">Country</label>
//     <br/>
//     <select
//       id="country"
//       name="country"
//       value={formData.country}
//       onChange={changeHandler}
//       className="outline"
//       >

//       <option>India</option>
//       <option>United States</option>
//       <option>Canada</option>
//       <option>Mexico</option>
//     </select>

//     <br/>
//     <label htmlFor="streetAddress">Street Address</label>
//     <br/>
//     <input
//       type="text"
//       name="streetAddress"
//       id="streetAddress"
//       placeholder="B-25C"
//       value={formData.streetAddress}
//       onChange={changeHandler}
//       className="outline"
//     />

//     <br/>
//     <label htmlFor="city">City</label>
//     <br/>
//     <input
//       type="text"
//       name="city"
//       id="city"
//       placeholder="B-25C"
//       value={formData.city}
//       onChange={changeHandler}
//       className="outline"
//     />

//   <br/>
//     <label htmlFor="state">State / Province</label>
//     <br/>
//     <input
//       type="text"
//       name="state"
//       id="state"
//       placeholder="Bihar"
//       value={formData.state}
//       onChange={changeHandler}
//       className="outline"
//     />

//     <br/>
//     <label htmlFor="postalCode">Postal Code</label>
//     <br/>
//     <input
//       type="text"
//       name="postalCode"
//       id="postalCode"
//       placeholder="110077"
//       value={formData.postalCode}
//       onChange={changeHandler}
//       className="outline"
//     />

//     <br/>
//     <br/>
//     <fieldset>
//       <legend>By Email</legend>

//       <div className="flex">
//       <input
//         id="comments"
//         name="comments"
//         type="checkbox"
//         checked={formData.comments}
//         onChange={changeHandler}
//       />
//       <div>
//         <label htmlFor="comments">Comments</label>
//         <p>Get notified when someones posts a comment on a posting.</p>
//       </div>
//       </div>

//       <div className="flex">
//       <input
//         id="candidates"
//         name="candidates"
//         type="checkbox"
//         checked={formData.candidates}
//         onChange={changeHandler}
//       />
//       <div>
//         <label htmlFor="candidates">Candidates</label>
//         <p>Get notified when a candidate applies for a job.</p>
//       </div>
//       </div>

//       <div className="flex">
//       <input
//         id="offers"
//         name="offers"
//         type="checkbox"
//         checked={formData.offers}
//         onChange={changeHandler}
//       />
//       <div>
//         <label htmlFor="offers">Offers</label>
//         <p>Get notified when a candidate accepts or rejects an offer.

// </p>
//       </div>
//       </div>
      


//     </fieldset>

//     <br/>
//     <br/>
//     <fieldset>
//       <legend>Push Notifications</legend>
//       <p>These are delivered via SMS to your mobile phone.</p>

//       <input
//         type="radio"
//         id="pushEverything"
//         name="pushNotifications"
//         value="Everything"
//         onChange={changeHandler}
//       />

//       <label htmlFor="pushEverything">Everything</label>

//       <br/>
//       <input
//         type="radio"
//         id="pushEmail"
//         name="pushNotifications"
//         value="Same as email"
//         onChange={changeHandler}
//       />

//       <label htmlFor="pushEmail">Same as email</label>

//       <br/>
//       <input
//         type="radio"
//         id="pushNothing"
//         name="pushNotifications"
//         value="No Push Notifications"
//         onChange={changeHandler}
//       />

//       <label htmlFor="pushNothing">No Push Notifications</label>

//     </fieldset>



//    <button
//    className="bg-blue-500 text-white font-bold rounded py-2 px-4"
//    >Save</button>






//    </form>

//    </div>
//   );
// }

// export default App;