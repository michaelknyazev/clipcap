import { Button, Icon, Intent, NonIdealState, Tag } from "@blueprintjs/core";
import { PageLayout } from "../components/layouts/PageLayout";
import { useRouter } from "next/router";
import { TFeature } from "@clipcap/types";

const PaywallPage: TFeature = () => {
  const router = useRouter();

  const handlePay = () => {

  }

  const handleWait = () => {
    router.push('/');
  }

  return (
    <PageLayout>
      <PageLayout.Section empty>
        <NonIdealState
          icon={<Icon iconSize={40} icon="dollar" />}
          title="Free limit reached!"
          description={
            <>
            Вы достигли лимита в 5 видео в день. Купите подписку
            <Tag intent={Intent.SUCCESS} style={{ margin: "0 5px" }}>PRO</Tag>
            для доступа к безлимитным видео.
            </>
          }
        />
      </PageLayout.Section>
      <PageLayout.Section>
        <Button large intent={Intent.SUCCESS} fill icon="credit-card">Купить</Button>
      </PageLayout.Section>
      <PageLayout.Section>
        <Button onClick={handleWait} large intent={Intent.NONE} fill icon="time">5 видео для меня достаточно</Button>
      </PageLayout.Section>
    </PageLayout>
  )
}

export default PaywallPage;