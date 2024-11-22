import { useEffect, useState } from 'react'
import { getVisitorsNumber, recordVisitorsApi } from '@/services/visitor'

interface VisitsLogProps {
  children: React.ReactNode
}

const VisitsLog = ({ children }: VisitsLogProps) => {
  const [visitLogInfo, setVisitLogInfo] = useState({
    people_number: 0,
    total_number: 0
  });

  useEffect(() => {
    recordVisitorsApi();
    onLoad()
  }, [])

  const onLoad = async () => {
    const res = await getVisitorsNumber();

    if (!res) return;

    setVisitLogInfo({
      people_number: res?.people_number || 0,
      total_number: res?.total_number || 0,
    });
  }

  return (
    <div style={{ marginTop: 5 }}>
      <span>访问人数 {visitLogInfo.people_number}</span>
      {children}
      <span>访问次数 {visitLogInfo.total_number}</span>
    </div>
  )
}

export default VisitsLog;
