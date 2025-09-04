const  loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))

};
const removeActive =()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn)=>
        btn.classList.remove("active")); 
    };

// const manageSpinner = (status) =>{
//     if(status === true){
//         document.getElementById("spinner").classList.remove("hidden");
//         document.getElementById("word-container").classList.add("hidden");
//     }else{
//         document.getElementById("spinner").classList.add("hidden");
//         document.getElementById("word-container").classList.remove("hidden");
//     }
// }
const loadLevelWord = (id)=>{
    // manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data)=>{
        removeActive();
        const clickBtn = document.getElementById(`level-btn-${id}`);
        //console.log(clickBtn);
        clickBtn.classList.add("active");
        displayLevelWord(data.data)});
};
const loadWordDetail = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetail(data.data)

}
const displayWordDetail =(word)=>{
    console.log(word);
    const detailsBox = document.getElementById("details-contenter");
    detailsBox.innerHTML =`<div class="space-y-5">
      <h2 class="font-bold text-xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      <h5 class="font-bold" >Meaning</h5>
      <p>${word.meaning}</p>
      <h4 class="font-bold">Example</h4>
      <p>${word.sentence}</p>
      <p class="font-bold">সমার্থক শব্দ গুলো</p>
      <button class="p-4 border-1 border-gray-500 bg-[#c0d9e3]">${word.synonyms[0]}</button>
      <button class="p-4 border-1 border-gray-500 bg-[#c0d9e3]">${word.synonyms[1]}</button>
      <button class="p-4 border-1 border-gray-500 bg-[#c0d9e3]">${word.synonyms[2]}</button><br>
      <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-outline btn-primary " >Complete Learning</button>
      `
    document.getElementById("my_modal_5").showModal();
}
const displayLevelWord = (words)=>{
    const wordContainer = document.getElementById("word-container");  
    wordContainer.innerHTML = "";
    if(words.length === 0){
        wordContainer.innerHTML = `<div class="bg[gray] text-center col-span-full py-10  rounded-xl" >
        <img src="./assets/alert-error.png" alt="" class="w-20 mx-auto mb-5">
  <h5 class="font-bold text-[20px] mb-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h5>
  <h1 class="font-bold text-4xl text-gray-500">নেক্সট Lesson এ যান</h1>
 </div>`;}
    words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML =`
       <div class="card bg-[white] py-15 px-5 rounded-xl shadow-sm text-center space-y-4 ">
    <h3 class="font-bold text-2xl">${word.word? word.word:"Not found" }</h3>
    <p>Meaning /Pronounciation</p>
    <h3 class="font-bold text-xl text-gray-500">"${word.meaning? word.meaning:"not found"}/${word.pronunciation? word.pronunciation:"not found"}"</h3>
   <div class="flex justify-between mt-5 items-center">
     <button onclick ="loadWordDetail(${word.id})" class="bg-[#1A91FF1A] p-3  "><i class="fa-solid fa-circle-info"></i></button>
    <button class="bg-[#1A91FF1A] p-3 "><i class="fa-solid fa-volume-high"></i></button>
   </div>
  </div>
    
    `;
    
    wordContainer.appendChild(card);
       
    });
    // manageSpinner(false);
    
};

const displayLesson =(lessons)=>{
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="level-btn-${lesson.level_no}"  
        onclick="loadLevelWord(${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-arrow-right-from-bracket">
        </i>Lesson - ${lesson.level_no}
        </button>`;
        levelContainer.appendChild(btnDiv);
    }
}

loadLessons();
document.getElementById("search-btn").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search").value;
    const searchValue = input.trim().toLowerCase();
    console.log(searchValue);
    fetch(`https://openapi.programming-hero.com/api/words/all`)
     .then((res)=>res.json())
     .then((data)=>{
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
        
        displayLevelWord(filterWords);
     });
});
