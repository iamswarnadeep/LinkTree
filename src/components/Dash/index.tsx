import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import Collapsible from 'react-collapsible'

import { useData } from '../../hooks/useData'
import { getLocalStorageData, setLocalStorageData } from '../../utils/localStorage'
import { Home } from '../Home'
import { ColorsSettings } from './ColorsSettings'
import { DataSettings } from './DataSettings'
import { SaveChangesAlert } from './SaveChangesAlert'
import { Content, Preview, Wrapper } from './styles'

export function Dash() {
  const { data, setData } = useData()
  const [isLoading, setIsLoading] = useState(true)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [activeTab, setActiveTab] = useState<'data' | 'colors'>('data')
  const initialData = data

  useEffect(() => {
    if (isLoading) {
      const storageData = getLocalStorageData()
      if (storageData) setData(storageData)
      else setData(initialData)

      setIsLoading(false)
    }

    if (!isLoading && !isEqual(initialData, data)) {
      setHasUnsavedChanges(true)
      setLocalStorageData(data)
    } else {
      setHasUnsavedChanges(false)
    }
  }, [data, initialData, isLoading, setData])

  const tabs = [
    { label: 'Data', value: 'data' },
    { label: 'Colors', value: 'colors' }
  ]
  const body = { data: <DataSettings />, colors: <ColorsSettings /> }

  return (
    <Wrapper>
      <Content>
        <SaveChangesAlert
          hasUnsavedChanges={hasUnsavedChanges}
          setHasUnsavedChanges={setHasUnsavedChanges}
          initialData={initialData}
        />
        <h1>Dash </h1>

        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActiveTab(tab.value as 'data' | 'colors')}>
            {tab.label}
          </button>
        ))}

        {body[activeTab]}

        <Collapsible trigger="Start here">
          <p>This is the collapsible content. It can be any element or React component you like.</p>
          <p>It can even be another Collapsible component. Check out the next section!</p>
        </Collapsible>
      </Content>
      <Preview>
        <Home />
      </Preview>
    </Wrapper>
  )
}
