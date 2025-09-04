import CasesListScreen from "@/components/CasesListScreen"

export default function MyReports(){
    return <CasesListScreen onSelectCase={function (caseId: string): void {
        throw new Error("Function not implemented.")
    } }/>
} 