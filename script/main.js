const  loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))

};
const loadLevelWord = (id)=>{
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data)=>displayLevelWord(data.data));
};
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
     <button class="bg-[#1A91FF1A] p-3  hover:bg[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="bg-[#1A91FF1A] p-3  hover:bg[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
   </div>
  </div>
    
    `;
    wordContainer.appendChild(card);

    });
    
};

const displayLesson =(lessons)=>{
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" 
        class="btn btn-outline btn-primary"><i class="fa-solid fa-arrow-right-from-bracket">
        </i>Lesson - ${lesson.level_no}
        </button>`;
        levelContainer.appendChild(btnDiv);
    }
}

loadLessons();
