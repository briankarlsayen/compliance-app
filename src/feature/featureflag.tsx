import { useContext } from 'react'
import FeatureFlagsContext, {
    ICapabilities,
    IFeatureFlagsProps,
} from './featureContext'

type FeatureFlagProviderProps = {
    children: any
    features: IFeatureFlagsProps
}

export const FeatureFlagProvider = ({
    children,
    features,
}: FeatureFlagProviderProps) => {
    if (features === null || typeof features !== 'object') {
        throw new TypeError('The features prop must be an object or an array.')
    }
    return (
        <FeatureFlagsContext.Provider value={features}>
            {children}
        </FeatureFlagsContext.Provider>
    )
}

// Custom Hook API
export function useFeature() {
    const featureFlags: IFeatureFlagsProps = useContext(FeatureFlagsContext)
    if (featureFlags === null) {
        throw new Error('You must wrap your components in a FeatureProvider.')
    }

    const getFeatureValue = (name: string) => {
        // return featureFlags.features[name as keyof ICapabilities];

        return featureFlags.features[name as keyof ICapabilities]
    }

    // For consistency, We return an array of helpers,
    // so we follow the pattern defined by the useState hook.
    // It makes the code open for extensions,
    // so no need to refactor the app when a new helper is added here.
    return [getFeatureValue]
}

// const [getFeatureValue] = useFeature();
// return (
//  {getFeatureValue("treasury_chart") === true && (<TreasuryChart />)}
//);

type FeatureProps = {
    feature: string
    featureValue: string | boolean
}

// HOC
// passing FeatureProps
export function withFeature<P extends FeatureProps>(
    Component: React.ComponentType<P>
): React.FC<P & FeatureProps> {
    return function WrappedComponent(props: P) {
        const { feature, featureValue, ...compProps } = props
        const [getFeatureValue] = useFeature()
        if (!getFeatureValue(props.feature) === props.featureValue) return null
        // not sure if props should be P
        return <Component {...(compProps as P)} />
    }
}

type FeatureRenderProps = {
    children: any
    feature: string
    featureValue: string | boolean
    render: any
}

// Render Prop API
export function Feature({
    feature,
    featureValue,
    children,
    render = children,
}: FeatureRenderProps) {
    const [getFeatureValue] = useFeature()
    if (typeof render === 'function')
        return render({ getFeatureValue, feature, featureValue })
    if (!getFeatureValue(feature) === featureValue) return null
    return render
}
