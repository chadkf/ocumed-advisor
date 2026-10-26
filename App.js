import { useState } from "react";

const MEDS = [
  { name: "Amiodarone", brandNames: ["Pacerone", "Cordarone"], generic: "amiodarone", class: "Antiarrhythmic", route: "Oral", effects: ["Corneal microdeposits (vortex keratopathy)", "Optic neuropathy", "Photosensitivity"], severity: "High", onset: "Months–years", mechanism: "Drug deposition in corneal epithelium and optic nerve toxicity", monitoring: [{ test: "Dilated fundus exam", detail: "Optic nerve head evaluation for disc edema or pallor" }, { test: "Visual acuity", detail: "Snellen or ETDRS — baseline and any acute change" }, { test: "Color vision", detail: "Ishihara or HRR plates — red-green axis most affected" }, { test: "Visual field (24-2 or 30-2)", detail: "Humphrey automated perimetry — central or cecocentral scotoma" }, { test: "Slit lamp biomicroscopy", detail: "Vortex keratopathy grading and documentation" }, { test: "OCT optic nerve", detail: "RNFL thickness analysis" }], frequency: "Baseline, then annually", patientNote: "This heart medication can cause a whorl-like deposit in the front of your eyes and rarely damage your optic nerve. Regular eye exams help monitor for these changes." },
  { name: "Hydroxychloroquine", brandNames: ["Plaquenil"], generic: "hydroxychloroquine", class: "Antimalarial / DMARD", route: "Oral", effects: ["Bull's-eye maculopathy", "Color vision loss", "Visual field defects"], severity: "High", onset: "Years (dose-dependent)", mechanism: "Accumulates in retinal pigment epithelium, causing toxic maculopathy", monitoring: [{ test: "OCT macula (SD-OCT)", detail: "Parafoveal thinning — 'flying saucer' sign; most sensitive structural test" }, { test: "Visual field 10-2", detail: "Humphrey 10-2 white stimulus — central 10° scotoma; AAO screening standard" }, { test: "mfERG", detail: "Parafoveal ring scotoma — most sensitive functional test; critical for Asian patients (pericentral pattern)" }, { test: "FAF", detail: "Increased/decreased FAF in parafoveal ring — excellent RPE documentation" }, { test: "Color vision", detail: "Farnsworth D-15 or Rabin Cone Contrast Test — red-green axis" }, { test: "Amsler grid", detail: "Patient self-monitoring between visits" }, { test: "Dilated fundus exam", detail: "Bull's-eye maculopathy — visible changes indicate advanced toxicity; use ancillary tests for early detection" }], frequency: "Baseline within 1 year of starting. Annual after 5 years (sooner if high risk: >5mg/kg/day, renal disease, tamoxifen co-use)", patientNote: "This medication used for lupus or arthritis can slowly damage the central part of your retina. Annual screening with specialized tests is critical to catch changes before you notice vision loss." },
  { name: "Chloroquine", brandNames: ["Aralen"], generic: "chloroquine", class: "Antimalarial", route: "Oral", effects: ["Retinal toxicity", "Maculopathy", "Reduced visual acuity"], severity: "High", onset: "Years", mechanism: "Binds melanin in RPE, causing photoreceptor degeneration", monitoring: [{ test: "OCT macula (SD-OCT)", detail: "Parafoveal thinning, photoreceptor layer disruption" }, { test: "Visual field 10-2", detail: "Humphrey 10-2 — central scotoma" }, { test: "mfERG", detail: "Parafoveal functional loss" }, { test: "FAF", detail: "RPE changes in parafoveal distribution" }, { test: "Color vision", detail: "Farnsworth D-15 or Rabin Cone Contrast Test" }], frequency: "Baseline, then annually. Higher toxicity risk than hydroxychloroquine", patientNote: "Similar to Plaquenil, this malaria medication can slowly damage your retina. Annual eye exams with specialized tests are very important." },
  { name: "Ethambutol", brandNames: ["Myambutol"], generic: "ethambutol", class: "Antibiotic (TB)", route: "Oral", effects: ["Optic neuritis", "Loss of color vision (red-green)", "Reduced visual acuity"], severity: "High", onset: "Weeks–months", mechanism: "Inhibits mitochondrial copper metabolism in optic nerve", monitoring: [{ test: "Visual acuity", detail: "Snellen or ETDRS — baseline critical; any reduction is significant" }, { test: "Color vision", detail: "Ishihara AND Farnsworth D-15 or Rabin Cone Contrast Test — most sensitive early indicator" }, { test: "Visual field (24-2 or 10-2)", detail: "Cecocentral or central scotoma" }, { test: "OCT optic nerve", detail: "RNFL baseline and comparison for chronic toxicity" }, { test: "VEP", detail: "Delayed P100 latency with optic nerve involvement" }], frequency: "Baseline before starting; monthly if >15mg/kg/day or renal impairment; every 3 months at standard doses", patientNote: "This tuberculosis antibiotic can inflame your optic nerve. Color vision changes are often the earliest warning sign — notify your doctor immediately if colors look washed out." },
  { name: "Tamoxifen", brandNames: ["Nolvadex", "Soltamox"], generic: "tamoxifen", class: "Hormone Therapy", route: "Oral", effects: ["Crystalline retinopathy", "Macular edema", "Corneal changes"], severity: "Moderate–High", onset: "Months–years", mechanism: "Drug crystal deposition in retinal nerve fiber layer", monitoring: [{ test: "OCT macula (SD-OCT)", detail: "Macular edema, cystoid changes, crystalline deposits" }, { test: "Dilated fundus exam", detail: "Refractile crystalline deposits in inner retinal layers" }, { test: "Visual acuity", detail: "ETDRS or Snellen — macular edema reduces VA" }, { test: "FAF", detail: "RPE changes characterization" }, { test: "FFA", detail: "If macular edema confirmed — assess leakage extent" }], frequency: "Baseline, then annually", patientNote: "This breast cancer medication can deposit tiny crystals in your retina and cause swelling at the center of your vision." },
  { name: "Topiramate", brandNames: ["Topamax", "Trokendi XR", "Qudexy XR"], generic: "topiramate", class: "Anticonvulsant", route: "Oral", effects: ["Acute angle-closure glaucoma", "Sudden myopia", "Suprachoroidal effusion"], severity: "High", onset: "Days–weeks (acute)", mechanism: "Ciliary body edema causing lens-iris diaphragm shift", monitoring: [{ test: "IOP (Goldmann applanation)", detail: "Urgent if symptoms of angle closure" }, { test: "Gonioscopy", detail: "Closed angle assessment; supraciliary effusion confirmation" }, { test: "Anterior segment OCT / UBM", detail: "Ciliary body edema and supraciliary effusion" }, { test: "Refraction", detail: "Myopic shift 1–8D confirms lens-iris diaphragm shift" }, { test: "B-scan ultrasound", detail: "Suprachoroidal effusion if suspected" }], frequency: "Urgent evaluation at symptom onset — medical emergency. Counsel patients to seek immediate care for acute eye pain", patientNote: "This medication can rarely cause sudden-onset glaucoma, which is a vision emergency. Seek immediate care for sudden eye pain, blurred vision, or halos around lights." },
  { name: "Vigabatrin", brandNames: ["Sabril", "Vigadrone"], generic: "vigabatrin", class: "Anticonvulsant", route: "Oral", effects: ["Peripheral visual field loss (bilateral, permanent)", "Optic atrophy"], severity: "High", onset: "Months–years", mechanism: "GABA accumulation causing retinal ganglion cell damage", monitoring: [{ test: "Visual field (30-2 or 60-4)", detail: "Bilateral nasal/peripheral constriction — primary monitoring test" }, { test: "ERG (full-field)", detail: "Reduced b-wave amplitude — critical in non-verbal patients" }, { test: "OCT macula", detail: "Ganglion cell complex (GCC) thinning, nasal quadrant" }, { test: "OCT optic nerve", detail: "RNFL thinning — temporal and nasal sectors" }], frequency: "Baseline, then every 3–6 months per REMS program — loss is irreversible", patientNote: "This epilepsy medication can permanently narrow your side vision — often without warning. Regular visual field testing every 3–6 months is essential." },
  { name: "Sildenafil", brandNames: ["Viagra", "Revatio"], generic: "sildenafil", class: "PDE5 Inhibitor", route: "Oral", effects: ["Blue-tinge vision (cyanopsia)", "Blurred vision", "NAION (rare)"], severity: "Mild–Moderate", onset: "Hours (acute); NAION unpredictable", mechanism: "PDE6 inhibition in photoreceptors; vascular effects on optic nerve", monitoring: [{ test: "Visual acuity", detail: "Any acute reduction → urgent evaluation for NAION" }, { test: "Dilated fundus exam", detail: "Disc edema in NAION — disc-at-risk in fellow eye" }, { test: "Visual field (24-2)", detail: "Altitudinal defect classic for NAION" }, { test: "OCT optic nerve", detail: "Acute RNFL edema; chronic thinning post-NAION" }], frequency: "Routine monitoring not required. Acute vision change → urgent exam. NAION history in one eye → counsel against use", patientNote: "This medication can temporarily cause a bluish tint to your vision. Rarely it may affect blood flow to your optic nerve — any acute vision change requires immediate eye care." },
  { name: "Isotretinoin", brandNames: ["Accutane", "Claravis", "Absorica", "Amnesteem"], generic: "isotretinoin", class: "Retinoid", route: "Oral", effects: ["Dry eyes", "Decreased night vision", "Blepharoconjunctivitis", "Corneal opacities"], severity: "Moderate", onset: "Weeks", mechanism: "Inhibits meibomian gland function; reduces vitamin A signaling in retina", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Meibomian gland assessment, corneal staining, lid margin inflammation" }, { test: "Tear film evaluation", detail: "TBUT, Schirmer — dry eye severity" }, { test: "Dark adaptometry / ERG", detail: "If night blindness reported — scotopic ERG for rod function" }], frequency: "Baseline; symptomatic follow-up", patientNote: "This acne medication commonly causes very dry, irritated eyes and can reduce night vision. Lubricating eye drops usually help — avoid contact lenses during treatment." },
  { name: "Rifampin", brandNames: ["Rifadin", "Rimactane"], generic: "rifampin", class: "Antibiotic (TB)", route: "Oral", effects: ["Red-orange tear discoloration", "Uveitis (rare)", "Conjunctival discoloration"], severity: "Mild", onset: "Days", mechanism: "Drug secretion in lacrimal fluid causing pigmentation", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Anterior chamber cell/flare if uveitis suspected" }, { test: "IOP measurement", detail: "If uveitis develops — secondary glaucoma risk" }], frequency: "Counsel about contact lens staining. Uveitis symptoms → prompt exam", patientNote: "This antibiotic can turn your tears and contact lenses orange-red. Harmless, but can permanently stain soft lenses." },
  { name: "Corticosteroids (systemic)", brandNames: ["Prednisone", "Deltasone", "Medrol", "Decadron"], generic: "prednisone dexamethasone methylprednisolone", class: "Corticosteroid", route: "Oral/IV", effects: ["Posterior subcapsular cataract", "Glaucoma (increased IOP)", "Exacerbation of ocular infections"], severity: "High (long-term)", onset: "Months–years", mechanism: "Lens protein glycation; trabecular meshwork dysfunction", monitoring: [{ test: "IOP measurement", detail: "Goldmann applanation — check at 1 month, 3 months, then regularly" }, { test: "Slit lamp biomicroscopy", detail: "PSC grading (LOCS III)" }, { test: "Visual field (24-2)", detail: "If IOP elevated — glaucomatous damage monitoring" }, { test: "OCT optic nerve", detail: "RNFL baseline if IOP elevated" }], frequency: "Baseline IOP; recheck 1 and 3 months. Annual comprehensive exam for long-term therapy", patientNote: "Long-term steroid use can cause cataracts and raise eye pressure, potentially leading to glaucoma. Regular eye exams are important." },
  { name: "Corticosteroids (topical)", brandNames: ["Pred Forte", "FML", "Lotemax", "Vexol"], generic: "prednisolone loteprednol fluorometholone", class: "Corticosteroid", route: "Topical", effects: ["Elevated IOP", "Posterior subcapsular cataract", "Worsening herpetic keratitis"], severity: "High", onset: "Weeks–months", mechanism: "Steroid-induced trabecular meshwork dysfunction", monitoring: [{ test: "IOP measurement", detail: "Check at 2–4 weeks after initiating; up to 30% of population are steroid responders" }, { test: "Slit lamp biomicroscopy", detail: "PSC, corneal status, herpetic reactivation signs" }, { test: "Gonioscopy", detail: "If IOP elevated" }], frequency: "IOP check at 2–4 weeks; monthly if elevated. Never refill without IOP check", patientNote: "These eye drops can raise the pressure inside your eye, sometimes significantly. Your eye pressure must be checked regularly." },
  { name: "Antihistamines (oral)", brandNames: ["Benadryl", "Zyrtec", "Claritin", "Allegra", "Xyzal"], generic: "diphenhydramine loratadine cetirizine fexofenadine", class: "Antihistamine", route: "Oral", effects: ["Dry eyes", "Blurred vision", "Angle-closure glaucoma risk"], severity: "Mild–Moderate", onset: "Hours", mechanism: "Anticholinergic effects reduce tear production and dilate pupil", monitoring: [{ test: "Gonioscopy", detail: "Angle assessment in at-risk patients before chronic use" }, { test: "IOP measurement", detail: "If narrow-angle patient" }, { test: "Tear film evaluation", detail: "TBUT, Schirmer" }], frequency: "Pre-screening gonioscopy in narrow-angle risk patients", patientNote: "Allergy pills can dry out your eyes and cause blurry vision. In some people with narrow-angle glaucoma they can trigger a dangerous pressure spike." },
  { name: "Decongestants (topical)", brandNames: ["Visine", "Clear Eyes", "Naphcon", "Murine"], generic: "tetrahydrozoline oxymetazoline naphazoline", class: "Decongestant / Vasoconstrictor", route: "Topical", effects: ["Rebound redness", "Elevated IOP in narrow-angle glaucoma", "Mydriasis"], severity: "Mild–Moderate", onset: "Days–weeks (rebound)", mechanism: "Alpha-adrenergic agonism causing rebound vasodilation", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Conjunctival injection, rebound hyperemia grading" }, { test: "IOP measurement", detail: "If narrow-angle patient" }], frequency: "Counsel against chronic use (>3 days). Evaluate true cause of redness", patientNote: "Redness-relief drops like Visine can make redness worse over time. Avoid long-term use — let your eye doctor find the real cause." },
  { name: "Fluoroquinolone antibiotics (topical)", brandNames: ["Ciloxan", "Vigamox", "Ocuflox", "Besivance"], generic: "ciprofloxacin moxifloxacin ofloxacin besifloxacin", class: "Antibiotic", route: "Topical", effects: ["Corneal precipitates / crystalline deposits", "Local irritation", "Corneal toxicity (prolonged use)"], severity: "Mild", onset: "Days–weeks", mechanism: "Drug precipitation in corneal stroma", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Corneal precipitate deposits — document size and location" }, { test: "Visual acuity", detail: "If deposits are visually significant" }], frequency: "Assess at each visit during treatment course", patientNote: "These antibiotic drops can leave tiny white deposits in the cornea during treatment. They usually resolve after finishing the drops." },
  { name: "Pilocarpine", brandNames: ["Isopto Carpine", "Vuity"], generic: "pilocarpine", class: "Cholinergic (Glaucoma / Presbyopia)", route: "Topical", effects: ["Induced myopia", "Miosis", "Brow ache", "Retinal detachment risk"], severity: "Moderate", onset: "Hours–days", mechanism: "Ciliary muscle spasm; miosis reduces peripheral vision", monitoring: [{ test: "Peripheral retinal exam", detail: "Screen for lattice degeneration and retinal holes before initiating" }, { test: "Refraction", detail: "Document myopic shift" }, { test: "Visual field (24-2)", detail: "Miosis reduces peripheral sensitivity — account for artifact in glaucoma VF" }], frequency: "Peripheral retinal exam before initiating; annual dilated exam", patientNote: "This glaucoma or reading drop keeps your pupil very small, causing difficulty in dim light. If you're very nearsighted, let your doctor know — there's a small risk of retinal complications." },
  { name: "Alpha-2 agonists (topical)", brandNames: ["Alphagan P", "Iopidine"], generic: "brimonidine apraclonidine", class: "Glaucoma Medication", route: "Topical", effects: ["Allergic conjunctivitis (late-onset)", "Dry eyes", "Lid retraction"], severity: "Mild–Moderate", onset: "Weeks–months", mechanism: "IgE-mediated delayed hypersensitivity", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Follicular conjunctivitis, papillary reaction — allergy presents at 6–18 months" }, { test: "IOP measurement", detail: "Monitor therapeutic efficacy" }], frequency: "Assess for allergic reaction at 6, 12, and 18 months", patientNote: "These glaucoma drops commonly cause an eye allergy reaction after months of use, with red, itchy, swollen eyes. A different drop can be substituted." },
  { name: "Beta-blockers (topical)", brandNames: ["Timoptic", "Betoptic", "Ocupress", "Istalol"], generic: "timolol betaxolol levobunolol carteolol", class: "Glaucoma Medication", route: "Topical", effects: ["Dry eyes", "Reduced corneal sensation", "Systemic absorption (bradycardia, bronchospasm)"], severity: "Mild–Moderate", onset: "Weeks", mechanism: "Beta-blockade reduces aqueous humor; systemic absorption via nasolacrimal duct", monitoring: [{ test: "IOP measurement", detail: "Trough and peak IOP monitoring" }, { test: "Tear film evaluation", detail: "TBUT, Schirmer — BAK preservative toxicity" }, { test: "Corneal sensitivity", detail: "Cochet-Bonnet aesthesiometry" }], frequency: "IOP every 3–6 months once stable. Remind patients to use punctal occlusion technique", patientNote: "These glaucoma drops are absorbed into your bloodstream and can affect your heart rate and breathing. Always tell your other doctors you use them." },
  { name: "Prostaglandin analogs (topical)", brandNames: ["Xalatan", "Lumigan", "Travatan Z", "Zioptan", "Vyzulta"], generic: "latanoprost bimatoprost travoprost tafluprost", class: "Glaucoma Medication", route: "Topical", effects: ["Iris pigmentation change (permanent)", "Eyelash growth / darkening", "Periorbital fat atrophy", "CME (rare)"], severity: "Mild–Moderate", onset: "Months–years", mechanism: "Stimulate melanogenesis in iris stroma; prostaglandin effects on adnexal tissue", monitoring: [{ test: "IOP measurement", detail: "Trough and peak IOP monitoring" }, { test: "Iris photography", detail: "Document iris color at baseline — permanent darkening in light/heterochromic irides" }, { test: "OCT macula", detail: "CME screening in aphakic/pseudophakic patients" }, { test: "Periorbital photography", detail: "Document periorbital fat atrophy for patient counseling" }], frequency: "IOP every 3–6 months. Annual iris/periorbital documentation", patientNote: "These glaucoma drops can permanently darken light-colored eyes, grow eyelashes longer, and cause a sunken look around your eyes over time." },
  { name: "Amitriptyline / TCAs", brandNames: ["Elavil", "Pamelor", "Tofranil"], generic: "amitriptyline nortriptyline imipramine", class: "Tricyclic Antidepressant", route: "Oral", effects: ["Blurred vision", "Dry eyes", "Mydriasis", "Angle-closure glaucoma risk"], severity: "Moderate", onset: "Days–weeks", mechanism: "Anticholinergic blockade of ciliary muscle and iris sphincter", monitoring: [{ test: "Gonioscopy", detail: "Angle assessment — TCAs contraindicated in narrow-angle glaucoma" }, { test: "IOP measurement", detail: "Monitor in narrow-angle or glaucoma patients" }, { test: "Tear film evaluation", detail: "TBUT, Schirmer" }], frequency: "Pre-treatment gonioscopy in at-risk patients. Annual exam", patientNote: "These antidepressants can cause blurry vision, dry eyes, and dilated pupils. People with narrow-angle glaucoma should use them cautiously." },
  { name: "SSRIs / SNRIs", brandNames: ["Zoloft", "Prozac", "Paxil", "Lexapro", "Celexa", "Effexor"], generic: "sertraline fluoxetine paroxetine escitalopram citalopram venlafaxine", class: "Antidepressant (SSRI/SNRI)", route: "Oral", effects: ["Mydriasis", "Angle-closure glaucoma risk", "Intraoperative floppy iris syndrome"], severity: "Mild–Moderate", onset: "Days–weeks", mechanism: "Serotonin-mediated mydriasis; anticholinergic effects with some agents", monitoring: [{ test: "Gonioscopy", detail: "Angle assessment if risk factors present before initiating" }, { test: "IOP measurement", detail: "In narrow-angle or glaucoma patients" }, { test: "Surgical disclosure", detail: "Inform ophthalmic surgeon before any eye surgery — IFIS risk" }], frequency: "Pre-treatment gonioscopy if risk factors. Disclose to surgeon before intraocular surgery", patientNote: "These antidepressants can dilate your pupils and in some people trigger a glaucoma attack. Always disclose them to any eye surgeon." },
  { name: "Tamsulosin / Alpha-blockers", brandNames: ["Flomax", "Uroxatral", "Cardura", "Rapaflo"], generic: "tamsulosin alfuzosin doxazosin silodosin", class: "Alpha-1 Blocker (BPH / HTN)", route: "Oral", effects: ["Intraoperative floppy iris syndrome (IFIS)", "Mydriasis"], severity: "High (surgical risk)", onset: "During cataract surgery", mechanism: "Iris dilator muscle relaxation persists after drug cessation", monitoring: [{ test: "Pre-surgical consultation", detail: "CRITICAL: disclose to cataract surgeon — IFIS persists years after stopping. Surgeon must use iris hooks, Malyugin ring, or modified OVD strategies" }, { test: "Pupil dilation assessment", detail: "Poor pharmacologic dilation = surrogate IFIS risk marker" }, { test: "Anterior segment OCT", detail: "Iris thickness — thinner iris = higher IFIS severity" }], frequency: "Mandatory pre-surgical disclosure every time. Confirm at every visit if surgery is planned", patientNote: "This prostate medication relaxes the iris muscles, causing serious complications during cataract surgery — even years after stopping. Always tell every eye surgeon you have ever taken this medication." },
  { name: "Digoxin", brandNames: ["Lanoxin", "Digitek"], generic: "digoxin", class: "Cardiac Glycoside", route: "Oral", effects: ["Xanthopsia (yellow-green tint)", "Blurred vision", "Visual halos", "Photopsia"], severity: "Moderate (toxicity sign)", onset: "Hours–days (toxic levels)", mechanism: "Photoreceptor Na+/K+-ATPase inhibition at toxic concentrations", monitoring: [{ test: "Color vision", detail: "Ishihara — xanthopsia is earliest visual symptom of toxicity" }, { test: "Visual acuity", detail: "Any change → urgent systemic toxicity workup" }, { test: "Dilated fundus exam", detail: "Typically normal — symptoms are functional/toxic" }], frequency: "Visual symptoms = systemic toxicity → urgent medical management", patientNote: "If you see a yellow-green tint or halos around lights, this may indicate dangerously high drug levels. Contact your doctor immediately — this is a medical emergency." },
  { name: "Phenothiazines", brandNames: ["Thorazine", "Mellaril", "Prolixin"], generic: "chlorpromazine thioridazine fluphenazine", class: "Antipsychotic (Phenothiazine)", route: "Oral", effects: ["Corneal and lens deposits", "Pigmentary retinopathy (thioridazine)", "Reduced visual acuity"], severity: "Moderate–High", onset: "Months–years", mechanism: "Drug-melanin binding; retinal toxicity with thioridazine", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Anterior corneal/lens deposits — grading and documentation" }, { test: "Dilated fundus exam", detail: "Salt-and-pepper pigmentary change (thioridazine)" }, { test: "ERG (full-field)", detail: "Most sensitive for thioridazine retinal toxicity — reduced rod and cone amplitudes" }, { test: "Color vision", detail: "Farnsworth D-15 or Rabin Cone Contrast Test" }, { test: "Visual field (30-2 or 60-4)", detail: "Peripheral constriction with pigmentary retinopathy" }], frequency: "Baseline, then annually. Thioridazine → semi-annual monitoring", patientNote: "These antipsychotic medications can cause deposits in your cornea and lens and, with some agents, significant retinal damage over time." },
  { name: "Vitamin A (high dose)", brandNames: ["Various supplements"], generic: "retinol vitamin a", class: "Supplement / Vitamin", route: "Oral", effects: ["Papilledema (pseudotumor cerebri)", "Diplopia", "Blurred vision"], severity: "High (at toxic levels)", onset: "Weeks–months", mechanism: "Increased intracranial pressure from hypervitaminosis A", monitoring: [{ test: "Dilated fundus exam", detail: "Optic disc edema — bilateral disc swelling with blurred margins" }, { test: "Visual field (24-2 or 30-2)", detail: "Enlarged blind spot, constriction with elevated ICP" }, { test: "OCT optic nerve", detail: "RNFL thickening (edema); Bruch's membrane opening displacement" }, { test: "Extraocular motility", detail: "CN VI palsy — lateral gaze limitation and diplopia from elevated ICP" }], frequency: "Urgent evaluation if papilledema or diplopia. Requires neurology coordination", patientNote: "Very high doses of vitamin A supplements can raise brain pressure, causing swollen optic nerves and double vision. This requires prompt medical attention." },
  { name: "Bisphosphonates", brandNames: ["Fosamax", "Actonel", "Boniva", "Reclast", "Zometa"], generic: "alendronate risedronate ibandronate zoledronic acid", class: "Osteoporosis Medication", route: "Oral/IV", effects: ["Uveitis", "Scleritis", "Episcleritis"], severity: "Moderate", onset: "Days–weeks", mechanism: "Inflammatory reaction; mevalonate pathway inhibition in ocular tissue", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "AC cell/flare (uveitis), scleral injection patterns (scleritis vs episcleritis)" }, { test: "IOP measurement", detail: "Uveitis can cause secondary hypertension or hypotony" }, { test: "B-scan ultrasound", detail: "Posterior scleritis — T-sign (fluid in Tenon's space)" }], frequency: "Prompt evaluation at symptom onset. Recurrence on rechallenge common — may require permanent discontinuation", patientNote: "These bone-strengthening medications can cause inflammation inside the eye (uveitis) or on the white of the eye. Seek prompt care for eye redness, pain, or light sensitivity." },
  { name: "Topical NSAIDs", brandNames: ["Acular", "Nevanac", "Bromday", "Prolensa", "Ilevro"], generic: "ketorolac nepafenac bromfenac diclofenac", class: "Topical NSAID", route: "Topical", effects: ["Corneal melt / perforation (prolonged use)", "Delayed epithelial healing", "Increased corneal fragility"], severity: "High (prolonged use)", onset: "Weeks", mechanism: "Prostaglandin inhibition impairs corneal wound healing", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Corneal epithelial integrity — NaFl staining, stromal thinning, Seidel test if perforation suspected" }, { test: "Corneal topography", detail: "Keratometric changes, local thinning" }, { test: "Visual acuity", detail: "Any reduction → immediate slit lamp evaluation" }], frequency: "Assess at each follow-up. NSAID + steroid combined use or dry eye patients — increased melt risk", patientNote: "These anti-inflammatory eye drops should only be used exactly as prescribed. Using them too long can weaken and thin the cornea." },
  { name: "Vincristine / Vinca alkaloids", brandNames: ["Oncovin", "Vincasar"], generic: "vincristine vinblastine", class: "Chemotherapy", route: "IV", effects: ["Optic neuropathy", "Extraocular muscle palsy / diplopia", "Ptosis", "Cortical blindness (rare)"], severity: "High", onset: "Weeks–months", mechanism: "Microtubule disruption causing axonal transport failure in cranial nerves", monitoring: [{ test: "Visual acuity", detail: "Baseline and with each cycle" }, { test: "Color vision", detail: "Ishihara — optic nerve involvement" }, { test: "Extraocular motility", detail: "CN III, IV, VI palsy assessment — diplopia evaluation" }, { test: "Visual field (24-2)", detail: "Optic neuropathy pattern" }, { test: "OCT optic nerve", detail: "RNFL baseline and monitoring" }], frequency: "Baseline before starting; assess with each chemotherapy cycle", patientNote: "This chemotherapy agent can affect the optic nerve and the muscles that move your eyes, causing blurry vision or double vision." },
  { name: "Cisplatin", brandNames: ["Platinol"], generic: "cisplatin carboplatin", class: "Chemotherapy (Platinum)", route: "IV", effects: ["Optic neuritis", "Retinal toxicity", "Cortical blindness (rare)", "Color vision loss"], severity: "High", onset: "Weeks–months", mechanism: "Platinum compound accumulation in retinal and optic nerve tissue", monitoring: [{ test: "Visual acuity", detail: "Baseline and each cycle" }, { test: "Color vision", detail: "Farnsworth D-15 or Ishihara" }, { test: "Visual field (24-2)", detail: "Central or paracentral scotoma" }, { test: "ERG", detail: "Retinal toxicity — cone and rod dysfunction" }, { test: "OCT optic nerve", detail: "RNFL monitoring" }], frequency: "Baseline; monitor each cycle or with visual symptoms", patientNote: "This chemotherapy drug can occasionally affect the retina and optic nerve. Report any vision changes immediately during treatment." },
  { name: "Fingolimod", brandNames: ["Gilenya", "Tascenso ODT"], generic: "fingolimod", class: "Immunomodulator (MS)", route: "Oral", effects: ["Macular edema", "Reduced visual acuity", "Visual field changes"], severity: "High", onset: "Months", mechanism: "Sphingosine-1-phosphate receptor modulation causing vascular leakage in macula", monitoring: [{ test: "OCT macula (SD-OCT)", detail: "Macular edema — cystoid changes; baseline and 3–4 months after initiation" }, { test: "Visual acuity", detail: "Snellen or ETDRS — VA reduction often first symptom" }, { test: "Dilated fundus exam", detail: "Macular appearance assessment" }, { test: "FFA", detail: "If macular edema confirmed on OCT" }], frequency: "Baseline OCT before starting. Repeat at 3–4 months. Annually thereafter. Diabetic or uveitis patients: higher risk, more frequent monitoring", patientNote: "This multiple sclerosis medication can cause fluid buildup under the center of your retina (macular edema), which can blur your vision. Regular eye exams with retinal scans are required." },
  { name: "Linezolid", brandNames: ["Zyvox"], generic: "linezolid", class: "Antibiotic (Oxazolidinone)", route: "Oral/IV", effects: ["Optic neuropathy", "Color vision loss", "Visual field defects"], severity: "High", onset: "Weeks–months (prolonged use)", mechanism: "Mitochondrial toxicity in optic nerve — similar mechanism to ethambutol", monitoring: [{ test: "Visual acuity", detail: "Baseline and monthly for prolonged courses" }, { test: "Color vision", detail: "Ishihara or Farnsworth D-15 — earliest indicator" }, { test: "Visual field (24-2)", detail: "Cecocentral scotoma pattern" }, { test: "OCT optic nerve", detail: "RNFL baseline and monitoring" }], frequency: "Baseline; monthly monitoring for courses >28 days", patientNote: "This antibiotic used for resistant infections can damage the optic nerve with prolonged use. Color vision changes are the earliest warning sign." },
  { name: "Quinine", brandNames: ["Qualaquin"], generic: "quinine", class: "Antimalarial / Muscle Relaxant", route: "Oral", effects: ["Retinal toxicity", "Narrowed visual fields", "Reduced visual acuity", "Night blindness"], severity: "High", onset: "Hours–days (toxic); chronic with low dose", mechanism: "Direct retinal photoreceptor toxicity; ganglion cell damage", monitoring: [{ test: "Visual field (30-2 or 60-4)", detail: "Peripheral constriction — 'gun barrel' vision in severe toxicity" }, { test: "ERG (full-field)", detail: "Reduced amplitudes — rod and cone dysfunction" }, { test: "OCT macula", detail: "Photoreceptor layer disruption" }, { test: "Visual acuity", detail: "Baseline and any acute change" }], frequency: "Acute toxicity → urgent evaluation. Chronic low-dose → annual monitoring", patientNote: "Quinine can damage the retina, causing narrowed or lost vision. Acute overdose is a medical emergency." },
  { name: "Deferoxamine", brandNames: ["Desferal"], generic: "deferoxamine", class: "Chelating Agent", route: "IV/SC", effects: ["Retinal toxicity / pigmentary changes", "Optic neuropathy", "Night blindness", "Loss of color vision"], severity: "High", onset: "Months–years", mechanism: "Iron chelation disrupts retinal pigment epithelium function; optic nerve ischemia", monitoring: [{ test: "Dilated fundus exam", detail: "Pigmentary retinopathy — RPE mottling and geographic atrophy" }, { test: "ERG (full-field)", detail: "Rod and cone dysfunction — most sensitive test" }, { test: "Visual field (30-2)", detail: "Peripheral or central field loss" }, { test: "Color vision", detail: "Farnsworth D-15 or Rabin Cone Contrast Test" }, { test: "OCT macula", detail: "Photoreceptor and RPE changes" }], frequency: "Baseline, then every 6–12 months during treatment", patientNote: "This iron-removal medication can damage your retina over time. Regular eye exams with specialized tests are required throughout treatment." },
  { name: "Niacin (high dose)", brandNames: ["Niaspan", "Slo-Niacin"], generic: "niacin nicotinic acid", class: "Lipid-Lowering / Supplement", route: "Oral", effects: ["Cystoid macular edema", "Reduced visual acuity", "Foveal cysts"], severity: "Moderate", onset: "Months", mechanism: "Unknown — possibly prostaglandin-mediated disruption of Müller cell function in fovea", monitoring: [{ test: "OCT macula (SD-OCT)", detail: "Cystoid foveal changes — hyporeflective cysts without leakage on FFA (distinguishes from other CME)" }, { test: "Visual acuity", detail: "Reduction correlates with cyst severity" }, { test: "FFA", detail: "No leakage — helpful to distinguish from diabetic or other CME" }], frequency: "Baseline OCT. Repeat at 3–6 months or with VA change. Usually reversible after discontinuation", patientNote: "High-dose niacin (a cholesterol medication) can rarely cause fluid-filled cysts at the center of your retina, causing blurry vision that usually reverses when the medication is stopped." },
  { name: "Methamphetamine", brandNames: ["Street: meth, crystal, ice, speed"], generic: "methamphetamine", class: "Stimulant (Illicit)", route: "Smoked/IV/Oral/Intranasal", effects: ["Severe dry eye / meibomian gland dysfunction", "Retinal vasospasm", "Cotton-wool spots", "Corneal abrasions (meth mites — skin picking)", "Optic neuropathy (chronic)"], severity: "High", onset: "Acute and chronic", mechanism: "Sympathomimetic vasoconstriction; dopaminergic and anticholinergic ocular effects; formication causes eye rubbing and corneal trauma", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Corneal abrasions, ulcers, meibomian gland dysfunction, severe anterior segment evaluation" }, { test: "Tear film evaluation", detail: "TBUT, Schirmer — severe dry eye is nearly universal" }, { test: "Dilated fundus exam", detail: "Cotton-wool spots, retinal vasospasm, vascular changes" }, { test: "Visual acuity", detail: "Baseline and each visit" }], frequency: "Each clinical encounter — these patients often present with multiple acute and chronic ocular issues", patientNote: "Methamphetamine use severely damages the eyes in multiple ways — causing extreme dry eye, corneal injuries from skin picking near the eyes, and damage to retinal blood vessels." },
  { name: "Cocaine", brandNames: ["Street: coke, crack, blow"], generic: "cocaine", class: "Stimulant (Illicit)", route: "Intranasal/IV/Smoked", effects: ["Corneal anesthesia (risk of ulceration)", "Retinal artery occlusion", "Mydriasis", "Talc retinopathy (IV use)", "Nasal septum perforation affecting orbit"], severity: "High", onset: "Acute and chronic", mechanism: "Local anesthetic effect on corneal nerves; vasospasm causing retinal artery occlusion; talc emboli from IV adulterants", monitoring: [{ test: "Slit lamp biomicroscopy", detail: "Corneal sensation testing (Cochet-Bonnet), neurotrophic ulcers, corneal staining" }, { test: "Dilated fundus exam", detail: "Retinal artery occlusion, talc emboli (glistening yellow deposits in arterioles)" }, { test: "Visual field (24-2)", detail: "Field defect corresponding to arterial occlusion territory" }], frequency: "Prompt evaluation for any acute vision change. Chronic users — each visit", patientNote: "Cocaine numbs the surface of the eye, making it vulnerable to unnoticed injury and serious ulcers. It can also cause sudden vision loss from blocked retinal blood vessels." },
  { name: "Cannabis (THC)", brandNames: ["Street: weed, marijuana, pot, dabs"], generic: "tetrahydrocannabinol delta-9-thc", class: "Cannabinoid (Illicit / Rx)", route: "Smoked/Oral/Vaporized", effects: ["Reduced IOP (relevant in glaucoma)", "Reduced contrast sensitivity", "Delayed dark adaptation", "Conjunctival injection (redness)", "Impaired smooth pursuit and saccades"], severity: "Mild", onset: "Minutes–hours (acute)", mechanism: "CB1 receptor activation reduces aqueous production; impairs retinal ganglion cell processing", monitoring: [{ test: "IOP measurement", detail: "IOP reduction is short-lived (3–4 hours) — insufficient for 24-hour glaucoma management" }, { test: "Contrast sensitivity", detail: "Pelli-Robson chart — reduced with chronic heavy use" }, { test: "Slit lamp biomicroscopy", detail: "Conjunctival injection grading" }], frequency: "Routine monitoring based on other risk factors. Counsel that short IOP reduction is insufficient glaucoma treatment", patientNote: "Cannabis can temporarily reduce eye pressure and cause red eyes. The pressure-lowering effect is too short-lived to treat glaucoma. Heavy long-term use may reduce your ability to detect contrast." },
  { name: "MDMA (Ecstasy)", brandNames: ["Street: molly, ecstasy, X"], generic: "3,4-methylenedioxymethamphetamine mdma", class: "Entactogen (Illicit)", route: "Oral", effects: ["Nystagmus (gaze-evoked)", "Mydriasis", "Reduced contrast sensitivity", "Visual hallucinations", "HPPD (with chronic use)"], severity: "Mild–Moderate", onset: "Hours (acute); months (chronic)", mechanism: "Serotonin-dopamine release causing autonomic and visual cortex effects", monitoring: [{ test: "Extraocular motility", detail: "Nystagmus assessment — gaze-evoked horizontal nystagmus is characteristic acute finding" }, { test: "Pupil evaluation", detail: "Mydriasis grading; anisocoria assessment" }, { test: "Contrast sensitivity", detail: "Chronic use — Pelli-Robson" }], frequency: "Evaluate acutely as needed. HPPD or persistent visual symptoms → neuro-ophthalmology referral", patientNote: "MDMA (Ecstasy) causes eye flickering (nystagmus), very large pupils, and can cause persistent visual disturbances with repeated use." },
  { name: "Heroin / Opioids", brandNames: ["Street: heroin, smack, H; Rx: OxyContin, Vicodin, fentanyl"], generic: "heroin oxycodone hydrocodone fentanyl morphine", class: "Opioid (Illicit / Rx)", route: "IV/Smoked/Intranasal/Oral", effects: ["Miosis (pinpoint pupils)", "Retinal emboli (IV use)", "Endophthalmitis (IV use)", "Reduced accommodation"], severity: "Moderate–High (IV use)", onset: "Acute (miosis); chronic (emboli, infection)", mechanism: "Mu-opioid receptor activation causes miosis; IV injection introduces emboli and pathogens", monitoring: [{ test: "Pupil evaluation", detail: "Miosis assessment; anisocoria may indicate other pathology" }, { test: "Dilated fundus exam", detail: "Retinal emboli (white/yellow arteriolar plugs), cotton-wool spots, vascular changes" }, { test: "Slit lamp biomicroscopy", detail: "Endophthalmitis signs — hypopyon, AC reaction, severe pain with IV drug use" }], frequency: "Acute presentation as needed. Any IV drug user with painful red eye → urgent endophthalmitis rule-out", patientNote: "Opioid use causes very small (pinpoint) pupils. Intravenous drug use can cause serious infections inside the eye (endophthalmitis) and blocked retinal blood vessels — both are sight-threatening emergencies." },
  { name: "Poppers (Amyl/Butyl Nitrite)", brandNames: ["Street: poppers, rush, jungle juice"], generic: "amyl nitrite butyl nitrite isobutyl nitrite", class: "Recreational Vasodilator (Illicit)", route: "Inhaled", effects: ["Poppers maculopathy", "Photoreceptor IS/OS disruption on OCT", "Central scotoma", "Reduced visual acuity"], severity: "Moderate–High", onset: "Days–weeks after use", mechanism: "PDE6 inhibition (similar to sildenafil) causing photoreceptor outer segment disruption in fovea", monitoring: [{ test: "OCT macula (SD-OCT)", detail: "IS/OS (ellipsoid zone) disruption at fovea — characteristic finding; may resolve partially after cessation" }, { test: "Visual acuity", detail: "Central VA reduction" }, { test: "Amsler grid", detail: "Central distortion or scotoma" }, { test: "FAF", detail: "Hyperautofluorescence at fovea corresponding to photoreceptor damage" }, { test: "mfERG", detail: "Foveal amplitude reduction" }], frequency: "Prompt evaluation with macular OCT for any user with central visual disturbance. Cessation often leads to partial recovery", patientNote: "Inhaling 'poppers' can damage the very center of your retina, causing blurry or distorted central vision. Stopping use may allow partial recovery, but some damage can be permanent." },
  { name: "Synthetic Cannabinoids", brandNames: ["Street: Spice, K2, fake weed"], generic: "synthetic cannabinoids jwh-018 ab-pinaca", class: "Synthetic Cannabinoid (Illicit)", route: "Smoked/Vaporized", effects: ["Optic neuropathy (reported)", "Visual field loss", "Nystagmus", "Acute vision loss"], severity: "Moderate–High", onset: "Hours–weeks", mechanism: "Potent full CB1 agonism; possible direct optic nerve toxicity via unknown mechanism", monitoring: [{ test: "Visual field (24-2 or 30-2)", detail: "Field loss pattern — variable depending on optic nerve or cortical involvement" }, { test: "OCT optic nerve", detail: "RNFL thinning if optic neuropathy confirmed" }, { test: "Visual acuity", detail: "Any reduction warrants urgent evaluation" }, { test: "Color vision", detail: "Ishihara — optic nerve involvement" }], frequency: "Urgent evaluation for acute vision change. Case reports suggest some recovery after cessation", patientNote: "Synthetic marijuana products like Spice or K2 are far more dangerous than cannabis and have caused cases of serious optic nerve damage and permanent vision loss." },
  { name: "LSD / Hallucinogens", brandNames: ["Street: acid, tabs, shrooms (psilocybin)"], generic: "lysergic acid diethylamide lsd psilocybin mescaline", class: "Hallucinogen (Illicit)", route: "Oral", effects: ["Hallucinogen persisting perception disorder (HPPD)", "Visual snow", "Palinopsia (trailing images)", "Mydriasis", "Photophobia"], severity: "Mild–Moderate (acute); Moderate (HPPD)", onset: "Hours (acute); months (HPPD)", mechanism: "5-HT2A serotonin receptor agonism in visual cortex causing persistent cortical hyperexcitability", monitoring: [{ test: "Visual acuity", detail: "Baseline — typically normal; HPPD is perceptual not structural" }, { test: "Visual field (24-2)", detail: "Typically normal — to rule out organic pathology" }, { test: "OCT macula and optic nerve", detail: "Rule out structural cause of visual symptoms" }, { test: "ERG / VEP", detail: "Cortical hyperexcitability — increased VEP amplitude in HPPD; research use" }], frequency: "Evaluation for persistent visual symptoms (>3 months) → neuro-ophthalmology / neurology referral for HPPD diagnosis", patientNote: "LSD and other hallucinogens can cause lasting visual disturbances called HPPD — including seeing visual static ('visual snow'), trailing images, and persistent halos — sometimes for months or years after use." },
];

const PREVENTION = [
  { category: "UV & Sun Exposure", icon: "☀️", items: [
    { title: "Wear UV-blocking sunglasses", detail: "Look for lenses blocking 99–100% of UVA and UVB. Overcast days still deliver significant UV exposure. Wraparound frames provide superior protection. UV damage accumulates over a lifetime and is directly linked to cataracts, macular degeneration, pterygium, and pinguecula." },
    { title: "Wear a wide-brimmed hat outdoors", detail: "A 3-inch brim reduces ocular UV exposure by up to 50% even with sunglasses. Especially important at high altitudes, near water, sand, or snow (which reflect up to 80% of UV)." },
    { title: "Never stare at the sun or solar eclipse", detail: "Even brief unprotected viewing of a solar eclipse causes solar retinopathy — permanent photoreceptor burn at the fovea. Standard sunglasses do not provide sufficient protection; certified ISO 12312-2 eclipse glasses are required." },
    { title: "Use UV-blocking contact lenses", detail: "Some contact lens materials include UV blocking as a secondary protection layer. Not a substitute for sunglasses but beneficial as supplemental protection." },
  ]},
  { category: "Eye Rubbing", icon: "👁️", items: [
    { title: "Avoid rubbing your eyes", detail: "Chronic or vigorous eye rubbing is strongly linked to the progression of keratoconus — a condition where the cornea progressively thins and bulges forward. It also introduces bacteria from fingers, risks corneal abrasion, and can dislodge recently placed contact lenses or damage post-surgical corneal flaps." },
    { title: "Treat the underlying itch, not the symptom", detail: "Rubbing from allergic conjunctivitis is the most common cause. Treating allergies with appropriate antihistamine or mast cell stabilizer eye drops eliminates the urge to rub without the corneal risk." },
    { title: "Use a cold compress instead of rubbing", detail: "A clean cold compress provides itch relief without mechanical corneal stress. Safe alternative during allergy seasons or after contact with irritants." },
  ]},
  { category: "Digital Screens & Blue Light", icon: "💻", items: [
    { title: "Follow the 20-20-20 rule", detail: "Every 20 minutes of screen time, look at something 20 feet away for 20 seconds. This relaxes ciliary muscle spasm from sustained near focus, reducing digital eye strain symptoms." },
    { title: "Maintain proper screen distance and ergonomics", detail: "Screen should be 20–28 inches from eyes, slightly below eye level. Reduce glare with matte screen filters or adjusting room lighting. Poor ergonomics contribute to asthenopia, dry eye, and exacerbate accommodative dysfunction." },
    { title: "Blink consciously during screen use", detail: "Blink rate drops from ~15/min to ~5/min during screen use. Incomplete blinks fail to spread the tear film, accelerating meibomian gland dysfunction and dry eye." },
    { title: "Limit screen exposure in children", detail: "Excessive near work and screen time is a major modifiable risk factor for myopia development in children. Spending 90+ minutes daily outdoors in natural light is strongly protective against myopia onset and progression." },
  ]},
  { category: "Dry Eye Prevention", icon: "💧", items: [
    { title: "Stay well hydrated", detail: "Systemic dehydration directly reduces aqueous tear volume. 8+ glasses of water daily supports healthy tear production." },
    { title: "Use a humidifier indoors", detail: "Indoor air humidity below 40% (common in heated or air-conditioned environments) accelerates tear evaporation. Maintaining 45–55% humidity significantly reduces dry eye symptoms." },
    { title: "Take omega-3 fatty acids", detail: "EPA and DHA (from fish oil or algae-based supplements) improve meibomian gland oil quality, reducing evaporative dry eye. 2,000mg/day of combined EPA/DHA is commonly recommended. Look for triglyceride-form omega-3 for best absorption." },
    { title: "Practice lid hygiene", detail: "Warm compresses (42°C for 10 minutes) and lid massage liquefy and express meibomian gland oils. Lid scrubs with diluted baby shampoo or commercial wipes remove bacterial biofilm at the lid margin. Essential for meibomian gland dysfunction and blepharitis." },
    { title: "Avoid air vents blowing toward face", detail: "Direct airflow from AC, heating vents, or car air conditioning aimed at the face dramatically increases tear evaporation. Redirect vents away from the eyes." },
    { title: "Remove eye makeup completely each night", detail: "Retained mascara, eyeliner, and eye shadow block meibomian gland orifices and introduce contamination to the lid margin. Use a dedicated, gentle eye makeup remover." },
  ]},
  { category: "Smoking & Vaping", icon: "🚭", items: [
    { title: "Stop smoking — the most impactful modifiable AMD risk factor", detail: "Smokers have 2–4x the risk of age-related macular degeneration (AMD) compared to non-smokers. Smoking reduces macular antioxidant levels (lutein, zeaxanthin) and causes choroidal vasoconstriction. Risk reduction begins within years of quitting." },
    { title: "Smoking accelerates cataract formation", detail: "Oxidative damage from tobacco smoke directly damages lens crystallins, accelerating nuclear and posterior subcapsular cataract development." },
    { title: "Smoking is a risk factor for optic nerve disease", detail: "Tobacco amblyopia (nutritional optic neuropathy) from cyanide in smoke, combined with poor B-vitamin absorption in heavy smokers, can cause progressive bilateral visual loss." },
    { title: "Vaping is not safe for the eyes", detail: "E-cigarette aerosol contains formaldehyde, acrolein, and heavy metals that cause oxidative retinal stress. Emerging evidence links vaping to dry eye, conjunctival irritation, and possible retinal vascular changes." },
  ]},
  { category: "Diet & Nutrition", icon: "🥗", items: [
    { title: "Eat a diet rich in lutein and zeaxanthin", detail: "These carotenoids concentrate in the macula and act as natural blue light and oxidative stress filters. Best sources: kale, spinach, collard greens, egg yolks. AREDS2 data supports supplementation with 10mg lutein + 2mg zeaxanthin for intermediate AMD." },
    { title: "Eat foods high in omega-3 fatty acids", detail: "Fatty fish (salmon, sardines, mackerel) 2x/week supports retinal photoreceptor membrane integrity and reduces dry eye. Omega-3 is incorporated into photoreceptor outer segments." },
    { title: "Control blood sugar — diabetic retinopathy is the leading cause of blindness in working-age adults", detail: "Every 1% reduction in HbA1c reduces risk of diabetic eye disease progression by 35%. Tight glucose control from time of diagnosis provides the greatest long-term protection." },
    { title: "Control blood pressure and cholesterol", detail: "Hypertensive retinopathy, retinal vein occlusion, and retinal artery occlusion are all directly linked to uncontrolled hypertension and hyperlipidemia. Blood pressure >130/80 requires management in patients with retinal vascular disease." },
    { title: "Take AREDS2 supplements if you have intermediate AMD", detail: "The formulation: Vitamin C 500mg, Vitamin E 400IU, Zinc 80mg, Copper 2mg, Lutein 10mg, Zeaxanthin 2mg. Reduces risk of progression to advanced AMD by 25%. Not indicated for early AMD or prevention in normal eyes." },
  ]},
  { category: "Eye Safety & Trauma Prevention", icon: "🥽", items: [
    { title: "Wear appropriate safety eyewear for all hazardous activities", detail: "ANSI Z87.1-rated polycarbonate eyewear for power tools, grinding, woodworking, yard work, and sports. Regular prescription glasses or sunglasses do not provide adequate impact protection. Eye injuries account for >2 million ER visits annually in the US." },
    { title: "Wear sport-specific protective eyewear", detail: "Racket sports, basketball, and baseball carry the highest risk of sport-related eye injuries. Polycarbonate sports goggles with ASTM F803 certification required. Functionally one-eyed patients should always wear protective eyewear in all sports." },
    { title: "Never use fireworks at home", detail: "Fireworks cause severe, often irreparable eye injuries — corneal lacerations, globe rupture, and chemical burns. Bystanders sustain nearly as many injuries as handlers." },
    { title: "Use eye protection when swimming", detail: "Swimming goggles prevent chlorine/chemical conjunctivitis, acanthamoeba keratitis (contact lens wearers in pools/lakes), and adenoviral conjunctivitis transmission in public pools." },
  ]},
  { category: "Contact Lens Safety", icon: "🔵", items: [
    { title: "Never sleep in contact lenses (unless specifically prescribed for overnight wear)", detail: "Overnight contact lens wear reduces corneal oxygenation by up to 98%, causing neovascularization and dramatically increasing risk of microbial keratitis — including Pseudomonas and Acanthamoeba — which can cause permanent vision loss." },
    { title: "Never use tap water, saliva, or well water with contacts or their case", detail: "Tap water contains Acanthamoeba — a free-living amoeba that causes devastating, treatment-resistant corneal infections. Use only sterile contact lens solution." },
    { title: "Replace contact lens cases every 1–3 months", detail: "Biofilm forms in contact lens cases within days. Old cases are the most common source of contact lens-related infections. Cases should be rinsed with fresh solution (not water), wiped, and stored face-down to dry." },
    { title: "Replace lenses on schedule", detail: "Extending lens wear beyond the replacement schedule allows protein and lipid deposits to accumulate, increasing infection risk and reducing oxygen transmission." },
  ]},
  { category: "Sleep & Eye Pressure", icon: "😴", items: [
    { title: "Get adequate sleep", detail: "Sleep deprivation impairs tear film stability, causes periorbital puffiness, worsens dry eye, and may transiently increase IOP. Chronic sleep apnea is an independent risk factor for normal-tension glaucoma and non-arteritic ischemic optic neuropathy (NAION)." },
    { title: "Avoid face-down sleeping position with glaucoma", detail: "Prone (face-down) sleeping position is associated with increased IOP due to direct pressure on the globe. Patients with glaucoma should sleep on their back or side." },
    { title: "Sleep apnea treatment may protect optic nerve", detail: "Untreated OSA causes repeated hypoxic episodes affecting optic nerve perfusion. CPAP therapy has been associated with slower glaucoma progression in some studies." },
  ]},
  { category: "Systemic Disease Control", icon: "🩺", items: [
    { title: "Annual dilated eye exams for all diabetics from time of diagnosis", detail: "Diabetic retinopathy has no symptoms in early stages. By the time vision is affected, significant irreversible damage has occurred. Annual exams allow intervention at the treatable stage." },
    { title: "Control thyroid disease — Graves' ophthalmopathy is common", detail: "Thyroid eye disease causes proptosis, diplopia, corneal exposure, and in severe cases compressive optic neuropathy. Close coordination between endocrinology and ophthalmology is essential." },
    { title: "Treat autoimmune disease aggressively", detail: "Uveitis, scleritis, and keratoconus all have strong associations with systemic autoimmune conditions including rheumatoid arthritis, HLA-B27-associated conditions, IBD, and lupus." },
  ]},
  { category: "Workplace & Environmental Hazards", icon: "🏭", items: [
    { title: "Wear appropriate eyewear in chemical exposure environments", detail: "Chemical splash injuries — especially alkali (oven cleaner, cement, ammonia) — are ophthalmic emergencies causing progressive corneal and anterior segment destruction. Alkali penetrates deeper and faster than acid. Immediate copious irrigation for 30+ minutes is first aid." },
    { title: "Reduce blue light exposure at night", detail: "Evening blue light from screens suppresses melatonin and disrupts circadian rhythm, which plays a role in IOP regulation. Blue light-blocking glasses or night mode screen settings after 8pm may be beneficial." },
    { title: "Be aware of laser pointer risks", detail: "Consumer laser pointers of Class IIIB and IV can cause permanent retinal burns with even brief exposure. Never point at eyes. Laser pointer maculopathy is a growing cause of permanent central scotoma in adolescents." },
  ]},
];

const SEVERITY_COLOR = {
  "High": { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" },
  "High (long-term)": { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" },
  "High (surgical risk)": { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" },
  "High (at toxic levels)": { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" },
  "High (prolonged use)": { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" },
  "Moderate–High": { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" },
  "Moderate (toxicity sign)": { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" },
  "Moderate": { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" },
  "Mild–Moderate": { bg: "#EAF3DE", text: "#3B6D11", border: "#C0DD97" },
  "Mild": { bg: "#EAF3DE", text: "#3B6D11", border: "#C0DD97" },
};

function Badge({ label, bg, text, border }) {
  return <span style={{ background: bg, color: text, border: `0.5px solid ${border}`, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>;
}

function MedCard({ med, mode }) {
  const [open, setOpen] = useState(false);
  const sev = SEVERITY_COLOR[med.severity] || SEVERITY_COLOR["Mild"];
  const isIllicit = med.class.includes("Illicit");
  return (
    <div style={{ background: "var(--color-background-primary)", border: `0.5px solid ${isIllicit ? "#F5C4B3" : "var(--color-border-tertiary)"}`, borderRadius: 10, marginBottom: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 500, fontSize: 15, color: "var(--color-text-primary)" }}>{med.name}</span>
            <Badge label={med.route} bg="var(--color-background-secondary)" text="var(--color-text-secondary)" border="var(--color-border-tertiary)" />
            <Badge label={med.severity} bg={sev.bg} text={sev.text} border={sev.border} />
            {isIllicit && <Badge label="Recreational/Illicit" bg="#FAECE7" text="#993C1D" border="#F0997B" />}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>
            {med.class}
            {med.brandNames?.length > 0 && <span style={{ marginLeft: 8, color: "var(--color-text-tertiary)" }}>Brand / Street: {med.brandNames.join(", ")}</span>}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 1 }}>Generic: {med.generic}</div>
        </div>
        <span style={{ fontSize: 18, color: "var(--color-text-secondary)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</span>
      </div>
      {open && (
        <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", padding: "14px 16px", background: "var(--color-background-secondary)" }}>
          {mode === "clinical" ? (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Ocular side effects</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>{med.effects.map((e, i) => <li key={i} style={{ fontSize: 14, color: "var(--color-text-primary)", marginBottom: 3 }}>{e}</li>)}</ul>
              </div>
              <div style={{ marginBottom: 12 }}><span style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Mechanism: </span><span style={{ fontSize: 14, color: "var(--color-text-primary)" }}>{med.mechanism}</span></div>
              <div style={{ marginBottom: 14 }}><span style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Onset: </span><span style={{ fontSize: 14, color: "var(--color-text-primary)" }}>{med.onset}</span></div>
              {med.monitoring?.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Recommended eye testing</div>
                  <div style={{ borderRadius: 8, overflow: "hidden", border: "0.5px solid var(--color-border-tertiary)" }}>
                    {med.monitoring.map((m, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, padding: "9px 12px", background: i % 2 === 0 ? "var(--color-background-primary)" : "var(--color-background-secondary)", borderBottom: i < med.monitoring.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                        <div style={{ minWidth: 180, fontWeight: 500, fontSize: 13, color: "var(--color-text-primary)" }}>{m.test}</div>
                        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{m.detail}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: "var(--color-text-secondary)", fontStyle: "italic" }}>Monitoring schedule: {med.frequency}</div>
                </div>
              )}
            </>
          ) : (
            <div style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.6 }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>What this means for your eyes</div>
                {med.patientNote}
              </div>
              {med.monitoring?.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Eye tests your doctor may perform</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>{med.monitoring.map((m, i) => <li key={i} style={{ marginBottom: 4, fontSize: 14 }}><span style={{ fontWeight: 500 }}>{m.test}</span></li>)}</ul>
                  <div style={{ marginTop: 8, fontSize: 13, color: "var(--color-text-secondary)", fontStyle: "italic" }}>{med.frequency}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PreventionTab() {
  const [open, setOpen] = useState({});
  const [catOpen, setCatOpen] = useState({});
  const toggle = (k) => setOpen(p => ({ ...p, [k]: !p[k] }));
  const toggleCat = (k) => setCatOpen(p => ({ ...p, [k]: !p[k] }));
  return (
    <div>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 16px" }}>Preventable causes of vision loss and eye damage — share with patients to promote proactive eye health.</p>
      {PREVENTION.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: 10, border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, overflow: "hidden" }}>
          <div onClick={() => toggleCat(ci)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", background: "var(--color-background-primary)", userSelect: "none" }}>
            <span style={{ fontSize: 18 }}>{cat.icon}</span>
            <span style={{ fontWeight: 500, fontSize: 15, flex: 1, color: "var(--color-text-primary)" }}>{cat.category}</span>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)", marginRight: 8 }}>{cat.items.length} tips</span>
            <span style={{ fontSize: 18, color: "var(--color-text-secondary)", transform: catOpen[ci] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</span>
          </div>
          {catOpen[ci] && (
            <div style={{ padding: "8px 12px 12px", background: "var(--color-background-secondary)" }}>
              {cat.items.map((item, ii) => {
                const k = `${ci}-${ii}`;
                return (
                  <div key={ii} style={{ background: "var(--color-background-primary)", borderRadius: 8, marginBottom: 8, overflow: "hidden", border: "0.5px solid var(--color-border-tertiary)" }}>
                    <div onClick={() => toggle(k)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", cursor: "pointer", userSelect: "none" }}>
                      <span style={{ flex: 1, fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)" }}>{item.title}</span>
                      <span style={{ fontSize: 16, color: "var(--color-text-secondary)", transform: open[k] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</span>
                    </div>
                    {open[k] && (
                      <div style={{ padding: "0 14px 12px", fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6, borderTop: "0.5px solid var(--color-border-tertiary)" }}>
                        <div style={{ paddingTop: 10 }}>{item.detail}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AnalysisResults({ results, mode }) {
  if (!results) return null;
  if (results.loading) return <div style={{ padding: 20, textAlign: "center", color: "var(--color-text-secondary)", fontSize: 14 }}>Analyzing medications...</div>;
  if (results.error) return <div style={{ padding: 20, color: "#A32D2D", fontSize: 14 }}>{results.error}</div>;
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: "10px 16px", fontSize: 13 }}><span style={{ color: "var(--color-text-secondary)" }}>Scanned: </span><span style={{ fontWeight: 500 }}>{results.total}</span></div>
        <div style={{ background: "#FCEBEB", borderRadius: 8, padding: "10px 16px", fontSize: 13 }}><span style={{ color: "#A32D2D" }}>With ocular effects: </span><span style={{ fontWeight: 500, color: "#A32D2D" }}>{results.flagged.length}</span></div>
      </div>
      {results.flagged.length === 0 && <div style={{ padding: 20, background: "#EAF3DE", borderRadius: 10, color: "#3B6D11", fontSize: 14 }}>No medications with known significant ocular side effects identified. Always use clinical judgment.</div>}
      {results.flagged.map((item, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>Matched: <strong style={{ color: "var(--color-text-primary)" }}>{item.inputName}</strong> → {item.med.name}</div>
          <MedCard med={item.med} mode={mode} />
        </div>
      ))}
      {results.notFound.length > 0 && <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--color-background-secondary)", borderRadius: 8, fontSize: 13, color: "var(--color-text-secondary)" }}>Not found in database: {results.notFound.join(", ")}</div>}
      <div style={{ marginTop: 14, padding: "10px 14px", background: "var(--color-background-secondary)", borderRadius: 8, fontSize: 12, color: "var(--color-text-secondary)" }}>Educational reference only. Always verify with current drug references and clinical judgment.</div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("library");
  const [mode, setMode] = useState("clinical");
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [routeFilter, setRouteFilter] = useState("All");
  const [medListInput, setMedListInput] = useState("");
  const [singleMed, setSingleMed] = useState("");
  const [results, setResults] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const classes = ["All", ...Array.from(new Set(MEDS.map(m => m.class))).sort()];
  const routes = ["All", "Oral", "Topical", "IV"];

  const filtered = MEDS.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.generic.toLowerCase().includes(q) || m.class.toLowerCase().includes(q) || m.effects.some(e => e.toLowerCase().includes(q)) || (m.brandNames || []).some(b => b.toLowerCase().includes(q));
    const matchClass = classFilter === "All" || m.class === classFilter;
    const matchRoute = routeFilter === "All" || m.route.includes(routeFilter);
    return matchSearch && matchClass && matchRoute;
  });

  const lookupMeds = async (inputText) => {
    if (!inputText.trim()) return;
    setResults({ loading: true });
    setAiLoading(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `Extract all medication names from the following patient medication list. Return ONLY a JSON array of strings — medication names as written, no preamble, no markdown.\n\nMedication list:\n${inputText}` }]
        })
      });
      const data = await resp.json();
      const raw = data.content?.map(c => c.text || "").join("") || "[]";
      const names = JSON.parse(raw.replace(/```json|```/g, "").trim());
      const dbNames = MEDS.map(m => ({ med: m, keywords: [m.name.toLowerCase(), ...m.generic.split(" "), ...(m.brandNames || []).map(b => b.toLowerCase())] }));
      const flagged = [], notFound = [];
      for (const inputName of names) {
        const lc = inputName.toLowerCase();
        const match = dbNames.find(({ keywords }) => keywords.some(k => lc.includes(k) || k.includes(lc)));
        if (match) { if (!flagged.find(f => f.med.name === match.med.name)) flagged.push({ inputName, med: match.med }); }
        else notFound.push(inputName);
      }
      setResults({ flagged, notFound, total: names.length });
    } catch (e) { setResults({ error: "Could not analyze medications. Please try again." }); }
    setAiLoading(false);
  };

  const lookupSingle = () => {
    if (!singleMed.trim()) return;
    const lc = singleMed.toLowerCase();
    const dbNames = MEDS.map(m => ({ med: m, keywords: [m.name.toLowerCase(), ...m.generic.split(" "), ...(m.brandNames || []).map(b => b.toLowerCase())] }));
    const match = dbNames.find(({ keywords }) => keywords.some(k => lc.includes(k) || k.includes(lc)));
    if (match) setResults({ flagged: [{ inputName: singleMed, med: match.med }], notFound: [], total: 1 });
    else setResults({ flagged: [], notFound: [singleMed], total: 1 });
  };

  const tabs = [
    { id: "library", label: "Med Library" },
    { id: "patient-list", label: "Patient Med List" },
    { id: "single", label: "Single Lookup" },
    { id: "prevention", label: "Eye Health Tips" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "16px 0", maxWidth: 680 }}>
      <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 2px", color: "var(--color-text-primary)" }}>OcuMed Advisor</h2>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 16px" }}>Ocular side effects of medications — clinical reference, patient education &amp; eye health prevention</p>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setResults(null); }} style={{ padding: "7px 14px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: tab === t.id ? "var(--color-text-primary)" : "transparent", color: tab === t.id ? "var(--color-background-primary)" : "var(--color-text-primary)", fontWeight: tab === t.id ? 500 : 400, cursor: "pointer", fontSize: 13 }}>
            {t.label}
          </button>
        ))}
        {tab !== "prevention" && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Mode:</span>
            {["clinical", "patient"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ padding: "5px 12px", borderRadius: 6, border: "0.5px solid var(--color-border-secondary)", background: mode === m ? "var(--color-background-info)" : "transparent", color: mode === m ? "var(--color-text-info)" : "var(--color-text-secondary)", fontWeight: mode === m ? 500 : 400, cursor: "pointer", fontSize: 12 }}>
                {m === "clinical" ? "Clinical" : "Patient Ed"}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === "library" && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drug, brand, class, or side effect..." style={{ flex: 1, minWidth: 180, padding: "8px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", fontSize: 14, background: "var(--color-background-primary)", color: "var(--color-text-primary)" }} />
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", fontSize: 13, background: "var(--color-background-primary)", color: "var(--color-text-primary)" }}>
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={routeFilter} onChange={e => setRouteFilter(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", fontSize: 13, background: "var(--color-background-primary)", color: "var(--color-text-primary)" }}>
              {routes.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 10 }}>{filtered.length} medications — {MEDS.filter(m => m.class.includes("Illicit")).length} recreational/illicit substances included</div>
          {filtered.map((m, i) => <MedCard key={i} med={m} mode={mode} />)}
        </>
      )}

      {tab === "patient-list" && (
        <>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>Paste the patient's full medication list. AI will parse and flag any with known ocular side effects.</p>
          <textarea value={medListInput} onChange={e => setMedListInput(e.target.value)} placeholder={"e.g.\nPlaquenil 200mg twice daily\nFlomax 0.4mg\nTimoptic 0.5% eye drops\nLexapro 10mg\nFosamax 70mg weekly\n..."} rows={7} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", fontSize: 14, background: "var(--color-background-primary)", color: "var(--color-text-primary)", resize: "vertical", boxSizing: "border-box", fontFamily: "var(--font-sans)" }} />
          <button onClick={() => lookupMeds(medListInput)} disabled={aiLoading || !medListInput.trim()} style={{ marginTop: 10, padding: "9px 20px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-text-primary)", color: "var(--color-background-primary)", fontWeight: 500, fontSize: 14, cursor: "pointer", opacity: aiLoading ? 0.6 : 1 }}>
            {aiLoading ? "Analyzing..." : "Analyze Med List ↗"}
          </button>
          <AnalysisResults results={results} mode={mode} />
        </>
      )}

      {tab === "single" && (
        <>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>Type a brand, generic, or street name to look up ocular side effects and monitoring protocol.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={singleMed} onChange={e => setSingleMed(e.target.value)} onKeyDown={e => e.key === "Enter" && lookupSingle()} placeholder="e.g. Plaquenil, Flomax, Topamax, poppers, meth..." style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", fontSize: 14, background: "var(--color-background-primary)", color: "var(--color-text-primary)" }} />
            <button onClick={lookupSingle} style={{ padding: "9px 18px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-text-primary)", color: "var(--color-background-primary)", fontWeight: 500, fontSize: 14, cursor: "pointer" }}>Lookup</button>
          </div>
          <AnalysisResults results={results} mode={mode} />
        </>
      )}

      {tab === "prevention" && <PreventionTab />}
    </div>
  );
}
