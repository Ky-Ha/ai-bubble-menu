import AiEditor from '@/components/ai-editor'

const paragraph = 
`Cybersecurity threats are rising rapidly in both frequency and impact. 
In 2025 alone, global losses due to cyberattacks are estimated to exceed USD 10.5 trillion. 
Developing countries are increasingly affected by this trend: from 2014 to 2023, 
cyber incidents in these countries grew at an average annual rate of 21%, 
ultimately accounting for 30% of all reported incidents globally.`

export default async function Page() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2">
        <AiEditor content={paragraph} />
      </div>
    </div>
  )
}
