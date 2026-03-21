FROM docker.1ms.run/library/postgres:14

# Install pgpool4
RUN apt-get update && apt-get install -y \
    pgpool2 \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy configuration
COPY pgpool.conf /etc/pgpool.conf
COPY pool_hba.conf /etc/pool_hba.conf
COPY pcp.conf /etc/pcp.conf
COPY pool_passwd /etc/pool_passwd

EXPOSE 5432 9898

# Override entrypoint to run pgpool directly in foreground
ENTRYPOINT ["pgpool"]
CMD ["-f", "/etc/pgpool.conf", "-a", "/etc/pool_hba.conf", "-n"]
