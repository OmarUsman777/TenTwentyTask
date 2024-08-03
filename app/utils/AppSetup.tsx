export const AppSetupGate = ({
    children,
}: {
    children: () => React.ReactElement;
}) => {

    return children();
};

export default AppSetupGate;
