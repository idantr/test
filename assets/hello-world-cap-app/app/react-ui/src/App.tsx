import { useState } from 'react'
import {
  ThemeProvider,
  ShellBar,
  FlexBox,
  Card,
  CardHeader,
  Title,
  Text,
  Input,
  Button,
  BusyIndicator,
  MessageStrip
} from '@ui5/webcomponents-react'

function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchGreeting = async () => {
    setLoading(true)
    setError('')
    setGreeting('')
    try {
      const param = name.trim() ? `?name='${encodeURIComponent(name.trim())}'` : ''
      const response = await fetch(`/greeting/greet()${param}`)
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      const data = await response.json()
      setGreeting(data.value)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider>
      <ShellBar primaryTitle="Hello World App" />
      <FlexBox
        direction="Column"
        alignItems="Center"
        justifyContent="Center"
        style={{ minHeight: 'calc(100vh - 44px)', gap: '1rem', padding: '2rem' }}
      >
        <Card
          header={<CardHeader titleText="SAP BTP Hello World" subtitleText="Powered by CAP + React" />}
          style={{ width: '420px' }}
        >
          <FlexBox direction="Column" style={{ padding: '1.5rem', gap: '1rem' }}>
            <Text>Enter your name to receive a personalised greeting, or leave blank for the default.</Text>
            <Input
              placeholder="Your name (optional)"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              onKeyDown={(e) => { if (e.key === 'Enter') fetchGreeting() }}
            />
            <Button design="Emphasized" onClick={fetchGreeting} disabled={loading}>
              Say Hello!
            </Button>
            {loading && (
              <FlexBox justifyContent="Center">
                <BusyIndicator active size="M" />
              </FlexBox>
            )}
            {error && (
              <MessageStrip design="Negative" hideCloseButton>
                {error}
              </MessageStrip>
            )}
            {greeting && !loading && (
              <FlexBox direction="Column" alignItems="Center" style={{ paddingTop: '0.5rem' }}>
                <Title level="H2" style={{ textAlign: 'center' }}>{greeting}</Title>
              </FlexBox>
            )}
          </FlexBox>
        </Card>
      </FlexBox>
    </ThemeProvider>
  )
}

export default App
