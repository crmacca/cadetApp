const CopyrightFooter = ({fullName}) => {
    return (
        <footer className="footer mt-5">
            <div className="container">
                <span className="text-muted">© {fullName} {new Date().getUTCFullYear()}.</span>
            </div>
        </footer>
    );
}

export default CopyrightFooter;